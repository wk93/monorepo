import { createFileRoute } from "@tanstack/react-router";

import AuthLayout from "@/components/layout/AuthLayout";
import { useHelloQuery } from "@/hooks/api/hello";
import { useProfileQuery } from "@/hooks/api/profile/useProfileQuery";

export const Route = createFileRoute("/_auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  const profile = useProfileQuery();

  const helloQuery = useHelloQuery();
  return (
    <AuthLayout title="Dashboard">
      {helloQuery.isLoading ? (
        <div>Wczytywanie</div>
      ) : helloQuery.data ? (
        <div>{helloQuery.data.message}</div>
      ) : (
        <div>Hello "/"!</div>
      )}
      <pre>{JSON.stringify(profile.data, null, 4)}</pre>
    </AuthLayout>
  );
}
