import { createFileRoute } from "@tanstack/react-router";

import LoadingScreen from "@/components/feedback/LoadingScreen";
import AuthLayout from "@/components/layout/AuthLayout";
import { usePermissionListQuery } from "@/features/roles/api/usePermissionListQuery";
import PermissionList from "@/features/roles/components/PermissionList";

export const Route = createFileRoute("/_auth/settings/permissions/$roleId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { roleId } = Route.useParams();
  const { data } = usePermissionListQuery();

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <AuthLayout title={roleId}>
      <PermissionList items={data} />
    </AuthLayout>
  );
}
