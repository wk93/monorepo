import { createFileRoute } from "@tanstack/react-router";

import AuthLayout from "@/components/layout/AuthLayout";

export const Route = createFileRoute("/_auth/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout title="Users">
      <div>Hello "/_auth/users/"!</div>
    </AuthLayout>
  );
}
