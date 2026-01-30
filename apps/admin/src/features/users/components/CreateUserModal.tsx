import React, { useRef } from "react";

type Props = Omit<ModalProps, "title" | "initialFocusRef" | "children">;

import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { CreateUserSchema } from "@mono/contracts";

import PasswordHelpers from "./PasswordHelpers";

import toast from "@/components/feedback/Toast";
import Button from "@/components/form/Button";
import Input from "@/components/form/Input";
import type { ModalProps } from "@/components/overlays/Modal";
import Modal from "@/components/overlays/Modal";
import { useCreateUserMutation } from "@/features/users/api/useCreateUserMutation";
import { getErrorMessage } from "@/utils/error-messages";

export const CreateUserWithRepasswordSchema = CreateUserSchema.extend({
  repassword: z.string(),
}).superRefine(({ password, repassword }, ctx) => {
  if (password !== repassword) {
    ctx.addIssue({
      code: "invalid_value",
      path: ["password"],
      message: "PASSWORDS_NOT_MATCHING",
      values: [password, repassword],
    });
  }
});

const CreateUserModal: React.FC<Props> = ({ ...props }) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const { isPending, mutateAsync } = useCreateUserMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      repassword: "",
    },
    onSubmit: async ({ value }) => {
      const data = await mutateAsync(value);
      setIsOpen(false);
      if (data) {
        toast({
          title: "Użytkownik został utworzony!",
          message: `Jego email: ${data.email} i id ${data.id}`,
          type: "success",
        });
      }
    },
    validators: { onChange: CreateUserWithRepasswordSchema },
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
          name="email"
          children={(field) => (
            <div>
              <Input
                type="email"
                value={field.state.value || ""}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
                placeholder="Adres email"
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
          name="password"
          children={(passwordField) => (
            <>
              <div>
                <Input
                  type="text"
                  value={passwordField.state.value || ""}
                  onChange={(e) => {
                    passwordField.handleChange(e.target.value);
                  }}
                  placeholder="Hasło"
                  ref={firstInputRef}
                />
              </div>
              <form.Field
                name="repassword"
                children={(repasswordField) => (
                  <div>
                    <Input
                      type="text"
                      value={repasswordField.state.value || ""}
                      onChange={(e) => {
                        repasswordField.handleChange(e.target.value);
                      }}
                      placeholder="Powtórz hasło"
                      ref={firstInputRef}
                    />
                  </div>
                )}
              />
              <PasswordHelpers
                isTouched={passwordField.state.meta.isTouched}
                errors={passwordField.state.meta.errors.map((err) => ({
                  message: err?.message ?? "",
                }))}
              />
            </>
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

export default CreateUserModal;
