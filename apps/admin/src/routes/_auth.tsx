import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

import LoadingScreen from "@/components/feedback/LoadingScreen";
import { useProfileQuery } from "@/hooks/api/profile/useProfileQuery";
import { useAuthStore } from "@/store/auth.store";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, isError, data } = useProfileQuery();
  const setToken = useAuthStore((s) => s.setToken);

  useEffect(() => {
    if (isError) {
      setToken(null);
    }
  }, [isError, setToken, data]);

  if (isPending) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
