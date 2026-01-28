import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster
        containerClassName={"mt-16"}
        position={"top-right"}
        toastOptions={{
          duration: 2000,
        }}
      />
    </>
  );
}
