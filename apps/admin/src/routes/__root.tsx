import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

import { ConfirmProvider } from "@/components/overlays/confirm";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <ConfirmProvider>
        <Outlet />
        <Toaster
          containerClassName={"mt-16"}
          position={"top-right"}
          toastOptions={{
            duration: 2000,
          }}
        />
      </ConfirmProvider>
    </>
  );
}
