import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";

import Button from "@/components/form/Button";
import Input from "@/components/form/Input";
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
    },
  });

  const helloQuery = useHelloQuery();
  return (
    <div className="w-screen h-screen bg-gray-800 flex items-center justify-center">
      <div className="border border-gray-300 w-full max-w-md bg-white rounded-lg p-4">
        <form
          className="flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await form.handleSubmit();
          }}
        >
          <div className="text-center">
            {helloQuery.isLoading ? (
              <div>Wczytywanie</div>
            ) : helloQuery.data ? (
              <div>{helloQuery.data.message}</div>
            ) : (
              <div>Hello "/"!</div>
            )}
          </div>

          <form.Field name="email">
            {(field) => (
              <Input
                placeholder="email"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.currentTarget.value);
                }}
              />
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <Input
                placeholder="hasło"
                type="password"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.currentTarget.value);
                }}
              />
            )}
          </form.Field>

          <Button type="submit">Zaloguj się</Button>
        </form>
      </div>
    </div>
  );
}
