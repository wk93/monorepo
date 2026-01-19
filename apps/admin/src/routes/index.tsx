import { createFileRoute } from "@tanstack/react-router";

import { useHelloQuery } from "@/hooks/api/hello";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const helloQuery = useHelloQuery();
  return helloQuery.isLoading ? (
    <div>Wczytywanie</div>
  ) : helloQuery.data ? (
    <div>{helloQuery.data.message}</div>
  ) : (
    <div>Hello "/"!</div>
  );
}
