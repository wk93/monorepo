import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";

import { LoginInputSchema } from "@mono/contracts/auth";

import { useHelloQuery } from "@/hooks/api/hello";
import { useLoginMutation } from "@/hooks/api/profile/useLoginMutation";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const loginMutation = useLoginMutation();

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      await loginMutation.mutateAsync(value);
      form.reset();
    },
    validators: { onChange: LoginInputSchema },
  });

  const helloQuery = useHelloQuery();
  return (
    <>
      {helloQuery.isLoading ? (
        <div>Wczytywanie</div>
      ) : helloQuery.data ? (
        <div>{helloQuery.data.message}</div>
      ) : (
        <div>Hello "/"!</div>
      )}

      <form
        className="flex flex-col gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => (
            <input
              placeholder="email"
              className="border border-gray-600"
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => {
                field.handleChange(e.target.value);
              }}
            />
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <input
              placeholder="hasło"
              className="border border-gray-600"
              type="password"
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => {
                field.handleChange(e.target.value);
              }}
            />
          )}
        </form.Field>

        <button type="submit">Zaloguj się</button>
      </form>
    </>
  );
}
