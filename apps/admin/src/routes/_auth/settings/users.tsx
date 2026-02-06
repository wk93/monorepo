import { createFileRoute } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useMemo, useState } from "react";

import LoadingIcon from "@/components/feedback/LoadingIcon";
import toast from "@/components/feedback/Toast";
import Button from "@/components/form/Button";
import AuthLayout from "@/components/layout/AuthLayout";
import { useConfirm } from "@/components/overlays/confirm";
import { type UserListItem, useUsersQuery } from "@/features/users/api";
import CreateUserModal from "@/features/users/components/CreateUserModal";

export const Route = createFileRoute("/_auth/settings/users")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const confirm = useConfirm();
  const { data, isLoading } = useUsersQuery();

  const columnHelper = createColumnHelper<UserListItem>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("email", {
        cell: (info) => info.getValue(),
        header: () => "Adres email",
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <Button
            onClick={() => {
              confirm("Czy na pewno chcesz aby wyskoczył toast?", () => {
                // realne ID:
                toast({ title: props.row.original.id });
              });
            }}
          >
            Usuń
          </Button>
        ),
      }),
    ],
    [confirm, columnHelper],
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <AuthLayout
      title="Użytkownicy"
      actions={
        <div className="flex shrink-0 gap-2">
          <Button
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
          >
            Dodaj użytkownika
          </Button>
        </div>
      }
    >
      <CreateUserModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      {isLoading ? (
        <div className="flex w-full h-full items-center justify-center">
          <LoadingIcon className="size-8 text-primary-600" />
        </div>
      ) : (
        <table
          className={clsx(
            "relative min-w-full divide-y divide-gray-300  w-full px-5 py-6 sm:px-6",
          )}
        >
          <thead className="bg-gray-50 sticky -top-6 border-b outline-gray-300 outline-1">
            {table.getHeaderGroups().map((headerGroup, index, arr) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={clsx(
                      "py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900",
                      index === 0 && "sm:pl-6",
                      index === arr.length - 1 && "sm:pr-6",
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, index, arr) => (
                  <td
                    key={cell.id}
                    className={clsx(
                      "px-3 py-4 text-sm whitespace-nowrap text-gray-500",
                      index === 0 && "sm:pl-6",
                      index === arr.length - 1 && "sm:pr-6 text-right",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AuthLayout>
  );
}
