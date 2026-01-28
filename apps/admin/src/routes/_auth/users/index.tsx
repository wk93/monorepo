import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import Button from "@/components/form/Button";
import AuthLayout from "@/components/layout/AuthLayout";
import { useConfirm } from "@/components/overlays/confirm";
import Modal from "@/components/overlays/Modal";

export const Route = createFileRoute("/_auth/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const confirm = useConfirm();
  return (
    <AuthLayout
      title="Users"
      actions={
        <div className="flex shrink-0 gap-2">
          <Button
            onClick={() => {
              confirm("Czy na pewno chcesz aby wyskoczył modal?", () =>
                { setIsModalOpen(true); },
              );
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
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} title="Modal">
        <div>Hello "/_auth/users/"!</div>
      </Modal>
      <div>Hello "/_auth/users/"!</div>
    </AuthLayout>
  );
}
