import React, { useRef } from "react";

type Props = Omit<ModalProps, "title" | "initialFocusRef" | "children">;

import { useForm } from "@tanstack/react-form";

import { CreateRoleSchema } from "@mono/contracts";

import { useCreateRoleMutation } from "../api/useCreateRoleMutation";

import toast from "@/components/feedback/Toast";
import Button from "@/components/form/Button";
import Input from "@/components/form/Input";
import type { ModalProps } from "@/components/overlays/Modal";
import Modal from "@/components/overlays/Modal";
import { getErrorMessage } from "@/utils/error-messages";

const CreateRoleModal: React.FC<Props> = ({ ...props }) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const { isPending, mutateAsync } = useCreateRoleMutation({
    onSuccess: () => {
      props.setIsOpen(false);
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      const data = await mutateAsync(value);
      if (data) {
        toast({
          title: "Rola utworzona!",
          message: `Rola ${data.name} została utworzona`,
          type: "success",
        });
      }
    },
    validators: { onChange: CreateRoleSchema },
  });

  const setIsOpen = (isOpen: boolean) => {
    form.reset();
    props.setIsOpen(isOpen);
  };

  return (
    <Modal {...props} title="Tworzenie użytkownika" setIsOpen={setIsOpen}>
      <form
        className="flex flex-col gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          await form.handleSubmit();
        }}
      >
        <form.Field
          name="name"
          children={(field) => (
            <div>
              <Input
                type="name"
                value={field.state.value || ""}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
                placeholder="Nazwa roli"
                ref={firstInputRef}
              />
              {field.state.meta.isTouched && field.state.meta.errors[0] && (
                <div className="text-red-500 text-xs mt-1">
                  {getErrorMessage(field.state.meta.errors[0].message)}
                </div>
              )}
            </div>
          )}
        />
        <form.Field
          name="description"
          children={(field) => (
            <div>
              <Input
                type="name"
                value={field.state.value || ""}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
                placeholder="Krótki opis roli"
                ref={firstInputRef}
              />
              {field.state.meta.isTouched && field.state.meta.errors[0] && (
                <div className="text-red-500 text-xs mt-1">
                  {getErrorMessage(field.state.meta.errors[0].message)}
                </div>
              )}
            </div>
          )}
        />
        <div className="flex gap-2 justify-end">
          <div className="shrink-0">
            <Button
              type="button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Anuluj
            </Button>
          </div>
          <div className="shrink-0">
            <Button type="submit" isLoading={isPending}>
              Zapisz
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateRoleModal;
