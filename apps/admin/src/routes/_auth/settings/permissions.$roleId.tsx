import { createFileRoute } from "@tanstack/react-router";

import AuthLayout from "@/components/layout/AuthLayout";

export const Route = createFileRoute("/_auth/settings/permissions/$roleId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { roleId } = Route.useParams();
  return <AuthLayout title={roleId}></AuthLayout>;
}
