import { createFileRoute, Link } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useMemo, useState } from "react";

import LoadingIcon from "@/components/feedback/LoadingIcon";
import Button from "@/components/form/Button";
import AuthLayout from "@/components/layout/AuthLayout";
import { useConfirm } from "@/components/overlays/confirm";
import { type RoleItem, useRolesQuery } from "@/features/roles/api";
import CreateRoleModal from "@/features/roles/components/CreateRoleModal";

export const Route = createFileRoute("/_auth/settings/permissions/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const confirm = useConfirm();
  const { data, isLoading } = useRolesQuery();

  const columnHelper = createColumnHelper<RoleItem>();

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "info",
        cell: ({ row }) => (
          <div>
            <strong className="text-gray-700">{row.original.name}</strong>
            <br />
            {row.original.description}
          </div>
        ),
        header: () => "Nazwa",
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => (
          <Link
            to="/settings/permissions/$roleId"
            params={{ roleId: row.original.id }}
          >
            <Button>Edytuj</Button>
          </Link>
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
      title="Uprawnienia"
      actions={
        <div className="flex shrink-0 gap-2">
          <Button
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
          >
            Dodaj rolę
          </Button>
        </div>
      }
    >
      <CreateRoleModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
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
