import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { PropsWithChildren, RefObject } from "react";

export interface ModalProps extends PropsWithChildren {
  title?: string;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  initialFocusRef?: RefObject<HTMLElement | null>;
}

const Modal = ({
  title,
  children,
  isOpen,
  setIsOpen,
  initialFocusRef,
}: ModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      {...(initialFocusRef ? { initialFocus: initialFocusRef } : {})}
      transition
      className="fixed inset-0 z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center">
          <DialogPanel
            transition
            className="relative w-full sm:max-w-lg rounded-lg bg-white shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:data-closed:translate-y-0 sm:data-closed:scale-95"
          >
            {title && (
              <div className="flex items-start justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-6">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  {title}
                </DialogTitle>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="inline-flex items-center justify-center rounded-md p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  aria-label="Zamknij"
                >
                  <XMarkIcon className="size-5" />
                </button>
              </div>
            )}

            <div className="px-4 pb-4 pt-3 sm:px-6 sm:pb-6">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
