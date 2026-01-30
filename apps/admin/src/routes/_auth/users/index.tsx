import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import LoadingIcon from "@/components/feedback/LoadingIcon";
import Button from "@/components/form/Button";
import AuthLayout from "@/components/layout/AuthLayout";
import { useConfirm } from "@/components/overlays/confirm";
import { useUsersQuery } from "@/features/users/api";
import CreateUserModal from "@/features/users/components/CreateUserModal";

export const Route = createFileRoute("/_auth/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const confirm = useConfirm();
  const { data, isLoading } = useUsersQuery();

  return (
    <AuthLayout
      title="Users"
      actions={
        <div className="flex shrink-0 gap-2">
          <Button
            onClick={() => {
              confirm("Czy na pewno chcesz aby wyskoczył modal?", () => {
                setIsModalOpen(true);
              });
            }}
          >
            Confirm
          </Button>
          <Button
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
          >
            Modal
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
        <div>{JSON.stringify(data)}</div>
      )}
    </AuthLayout>
  );
}
