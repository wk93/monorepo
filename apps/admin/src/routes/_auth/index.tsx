import { createFileRoute } from "@tanstack/react-router";

import { useHelloQuery } from "@/hooks/api/hello";
import { useProfileQuery } from "@/hooks/api/profile/useProfileQuery";
import { useAuthStore } from "@/store/auth.store";

export const Route = createFileRoute("/_auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  const profile = useProfileQuery();
  const setToken = useAuthStore((s) => s.setToken);

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
      <button
        className="bg-red-50"
        onClick={() => {
          setToken(null);
        }}
      >
        Wyloguj sie
      </button>
      <pre>{JSON.stringify(profile.data, null, 4)}</pre>
    </>
  );
}
