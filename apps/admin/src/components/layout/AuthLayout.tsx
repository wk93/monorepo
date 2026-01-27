import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

import { useAuthStore } from "@/store/auth.store";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

type Props = PropsWithChildren;

const AuthLayout: React.FC<Props> = ({ children }) => {
  const setToken = useAuthStore((s) => s.setToken);
  const navigation = [
    { name: "Dashboard", href: "#", current: true },
    { name: "Team", href: "#", current: false },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
    { name: "Reports", href: "#", current: false },
  ];
  const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Settings", href: "#" },
    {
      name: "Sign out",
      href: "#",
      onClick: () => {
        setToken(null);
      },
    },
  ];

  return (
    <>
      <div className="min-h-full">
        <div className="relative bg-primary-800 pb-32">
          <Disclosure as="nav" className="bg-primary-800">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="border-b border-white/10">
                <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                  <div className="flex items-center">
                    <div className="shrink-0">
                      <img
                        alt="Your Company"
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NCIgaGVpZ2h0PSI3NCIgdmlld0JveD0iMCAwIDc0IDc0IiBmaWxsPSJub25lIj4KICAgIDxwYXRoIGQ9Ik03My45OTQyIDM2LjkzNDJMNzMuOTkyNyAzNi45OTg0TDczLjk5NDIgMzcuMDY1OEM3My45OTQyIDU3LjQ2MjUgNTcuNDMwOCA3NCAzNi45OTcxIDc0QzE2LjU2MzQgNzQgMCA1Ny40NjI1IDAgMzcuMDY1OFYzNi45OTg0VjM2LjkzNDJDMCAxNi41MzYgMTYuNTYzNCAwIDM2Ljk5NzEgMEM1Ny40MzA4IDAgNzMuOTk0MiAxNi41MzYgNzMuOTk0MiAzNi45MzQyWiIgZmlsbD0iIzAwODFDNyIvPgogICAgPHBhdGggZD0iTTE3LjY1NDYgMzguODMwN0wxNC41Mzg5IDM2Ljk0ODJDMTIuNTg3MyAzNS43NjIyIDExLjE5NzQgMzQuNTk2NSAxMC4zNzM3IDMzLjQzODhDOS41NDM4NCAzMi4yODg4IDkuMTMyODEgMzAuOTY0OCA5LjEzMjgxIDI5LjQ2MzRDOS4xMzI4MSAyNy4yMTIyIDkuOTE0MDcgMjUuMzg2MSAxMS40NzgyIDIzLjk4MkMxMy4wNDA3IDIyLjU3NjQgMTUuMDcwNyAyMS44NzM1IDE3LjU3MTQgMjEuODczNUMxOS45NjM4IDIxLjg3MzUgMjIuMTUwOCAyMi41NTI4IDI0LjE0NzggMjMuOTE2MVYyOC41MDQ5QzIyLjA3ODYgMjYuNTIxOSAxOS44NTI1IDI1LjUyODggMTcuNDY5NCAyNS41Mjg4QzE2LjEyODEgMjUuNTI4OCAxNS4wMjUyIDI1LjgzOTUgMTQuMTU5MyAyNi40NTZDMTMuMjk2NCAyNy4wNzQxIDEyLjg2ODEgMjcuODY2NCAxMi44NjgxIDI4LjgyOTZDMTIuODY4MSAyOS42ODQ2IDEzLjE4MzUgMzAuNDg5NCAxMy44MTg4IDMxLjIzNDZDMTQuNDUyNiAzMS45ODEzIDE1LjQ3MzkgMzIuNzY3MyAxNi44NzQ5IDMzLjU4NzhMMjAuMDA0NiAzNS40MzlDMjMuNDkyMSAzNy41MjA4IDI1LjIzNjYgNDAuMTcyMSAyNS4yMzY2IDQzLjM5MjhDMjUuMjM2NiA0NS42ODQ4IDI0LjQ3MSA0Ny41NDU1IDIyLjk0MTQgNDguOTc3OEMyMS40MTAzIDUwLjQxMDEgMTkuNDI0MiA1MS4xMjU1IDE2Ljk3NjggNTEuMTI1NUMxNC4xNTkzIDUxLjEyNTUgMTEuNTk5IDUwLjIzNzUgOS4yODk2OSA0OC40NjE2VjQzLjMyNjlDMTEuNDkzOSA0Ni4xNDE0IDE0LjA0NzkgNDcuNTQ4NiAxNi45NTAyIDQ3LjU0ODZDMTguMjMwMyA0Ny41NDg2IDE5LjI5ODcgNDcuMTkwOSAyMC4xNDc0IDQ2LjQ3MjRDMjAuOTk2MSA0NS43NTg2IDIxLjQyNDQgNDQuODYxMiAyMS40MjQ0IDQzLjc4MTlDMjEuNDI0NCA0Mi4wMzU4IDIwLjE2NDYgNDAuMzg3IDE3LjY1NDYgMzguODMwN1oiIGZpbGw9IndoaXRlIi8+CiAgICA8cGF0aCBkPSJNNDQuMTMxMiAzNi43Mjk4SDUzLjcwMjVWNDguODE5QzUwLjE5MTUgNTAuMzU2NSA0Ni43MTE5IDUxLjEyMiA0My4yNTc0IDUxLjEyMkMzOC41Mzg0IDUxLjEyMiAzNC43Njg2IDQ5Ljc0MTUgMzEuOTQ3OSA0Ni45ODUxQzI5LjEyNTYgNDQuMjI1NiAyNy43MTY4IDQwLjgxODEgMjcuNzE2OCAzNi43NzIyQzI3LjcxNjggMzIuNTA4MiAyOS4xNzg5IDI4Ljk1NDggMzIuMTA0NyAyNi4xMjE2QzM1LjAzMjEgMjMuMjg4MyAzOC43MDE2IDIxLjg3MDEgNDMuMTExNSAyMS44NzAxQzQ0LjcxNjMgMjEuODcwMSA0Ni4yNDI4IDIyLjA0OSA0Ny42ODYxIDIyLjQwMzVDNDkuMTI3OCAyMi43NTk2IDUwLjk1NTUgMjMuNDEyMiA1My4xNTgxIDI0LjM1ODJWMjguNDgyNkM0OS43NDc1IDI2LjUxMjIgNDYuMzcxNCAyNS41MjcgNDMuMDE4OSAyNS41MjdDMzkuODkzOSAyNS41MjcgMzcuMjY0NSAyNi41OTA3IDM1LjEyNjMgMjguNzEwMUMzMi45ODY0IDMwLjgzNDMgMzEuOTE2NSAzMy40MzY5IDMxLjkxNjUgMzYuNTI3NUMzMS45MTY1IDM5Ljc2MzkgMzIuOTg2NCA0Mi40MDg5IDM1LjEyNzggNDQuNDY0QzM3LjI3MDggNDYuNTE2IDQwLjAyNTYgNDcuNTQ1MiA0My4zOTU0IDQ3LjU0NTJDNDUuMDMwMSA0Ny41NDUyIDQ2Ljk4NjQgNDcuMTcwMiA0OS4yNjc1IDQ2LjQyNUw0OS42NTgxIDQ2LjMwNDJWNDAuMzg4M0g0NC4xMzEyVjM2LjcyOThaIiBmaWxsPSJ3aGl0ZSIvPgogICAgPHJlY3QgeD0iNTguNDIxOSIgeT0iMjIuMjYwNyIgd2lkdGg9IjQuMDQ0MzgiIGhlaWdodD0iMjguNDcyMiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+"
                        className="size-12"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            aria-current={item.current ? "page" : undefined}
                            className={clsx(
                              item.current
                                ? "bg-primary-950 text-white"
                                : "text-white hover:bg-white/5",
                              "rounded-md px-3 py-2 text-sm font-medium",
                            )}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full p-1 text-white focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon aria-hidden="true" className="size-6" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <MenuButton className="relative flex max-w-xs items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            alt=""
                            src={user.imageUrl}
                            className="size-8 rounded-full outline -outline-offset-1 outline-white/10"
                          />
                        </MenuButton>

                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                          {userNavigation.map((item) => (
                            <MenuItem key={item.name}>
                              <a
                                href={item.href}
                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                onClick={item.onClick}
                              >
                                {item.name}
                              </a>
                            </MenuItem>
                          ))}
                        </MenuItems>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-primary-500">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon
                        aria-hidden="true"
                        className="block size-6 group-data-open:hidden"
                      />
                      <XMarkIcon
                        aria-hidden="true"
                        className="hidden size-6 group-data-open:block"
                      />
                    </DisclosureButton>
                  </div>
                </div>
              </div>
            </div>

            <DisclosurePanel className="border-b border-white/10 md:hidden">
              <div className="space-y-1 px-2 py-3 sm:px-3">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={clsx(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-white hover:bg-white/5",
                      "block rounded-md px-3 py-2 text-base font-medium",
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="shrink-0">
                    <img
                      alt=""
                      src={user.imageUrl}
                      className="size-10 rounded-full outline -outline-offset-1 outline-white/10"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base/5 font-medium text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Dashboard
              </h1>
            </div>
          </header>
        </div>

        <main className="relative -mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow-sm sm:px-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AuthLayout;
