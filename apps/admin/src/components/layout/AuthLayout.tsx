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
import { Link, linkOptions } from "@tanstack/react-router";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

import Logo from "../brand/Logo";

import { useAuthStore } from "@/store/auth.store";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

interface Props extends PropsWithChildren {
  title: string;
  actions?: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ title, children, actions }) => {
  const setToken = useAuthStore((s) => s.setToken);
  const navigation = linkOptions([
    { name: "Dashboard", to: "/" },
    { name: "Team", to: "/users" },
  ]);

  const userNavigation = linkOptions([
    { name: "Settings", to: "/", onClick: undefined },
    {
      name: "Sign out",
      to: "/login",
      onClick: () => {
        setToken(null);
      },
    },
  ]);

  return (
    <div className="h-screen flex flex-col">
      <div className="relative bg-primary-800 pb-32">
        <Disclosure as="nav" className="bg-primary-800">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="border-b border-white/10">
              <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                <div className="flex items-center">
                  <div className="shrink-0">
                    <Logo className="size-12" />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          {...item}
                          className={clsx(
                            "[.active]:bg-primary-950 [.active]:hover:bg-primary-950 text-white hover:bg-white/5 rounded-md px-3 py-2 text-sm font-medium",
                          )}
                        >
                          {item.name}
                        </Link>
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
                            <Link
                              {...item}
                              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                              onClick={item.onClick}
                            >
                              {item.name}
                            </Link>
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
            {({ close }) => (
              <>
                <div className="space-y-1 px-2 py-3 sm:px-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      {...item}
                      onClick={() => {
                        close();
                      }}
                      className={clsx(
                        "[.active]:bg-primary-900  [.active]:hover:bg-primary-900 text-white block rounded-md px-3 py-2 text-base font-medium",
                      )}
                    >
                      {item.name}
                    </Link>
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
                      <Link
                        key={item.name}
                        {...item}
                        onClick={() => {
                          item.onClick?.();
                          close();
                        }}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </DisclosurePanel>
        </Disclosure>
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8 items-center">
              <h1 className="shrink-0 text-3xl font-bold tracking-tight text-white">
                {title}
              </h1>
              {actions && (
                <div className="flex-1 flex justify-end">{actions}</div>
              )}
            </div>
          </div>
        </header>
      </div>

      <main className="relative -mt-32 flex-1 flex min-h-0">
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 flex-1 flex flex-col min-h-0">
          <div className="rounded-lg bg-white px-5 py-6 shadow-sm sm:px-6 flex-1 min-h-0 overflow-y-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
