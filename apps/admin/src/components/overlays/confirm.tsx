import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import Modal from "./Modal";

type ConfirmFn = (message: string, onConfirm: () => void) => void;

interface ConfirmState {
  isOpen: boolean;
  message: string;
  onConfirm: (() => void) | null;
}

const ConfirmContext = createContext<ConfirmFn | null>(null);

export function ConfirmProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<ConfirmState>({
    isOpen: false,
    message: "",
    onConfirm: null,
  });

  const close = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false, onConfirm: null, message: "" }));
  }, []);

  const confirm = useCallback<ConfirmFn>((message, onConfirm) => {
    setState({
      isOpen: true,
      message,
      onConfirm,
    });
  }, []);

  const value = useMemo(() => confirm, [confirm]);

  return (
    <ConfirmContext.Provider value={value}>
      {children}

      <Modal
        title="Potwierdź"
        isOpen={state.isOpen}
        setIsOpen={(v) => {
          if (!v) close();
        }}
      >
        <div className="space-y-6">
          <p className="text-sm text-gray-700">{state.message}</p>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="rounded-md px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              onClick={close}
            >
              Anuluj
            </button>

            <button
              type="button"
              className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:opacity-90"
              onClick={() => {
                const cb = state.onConfirm;
                close();
                cb?.();
              }}
            >
              Potwierdź
            </button>
          </div>
        </div>
      </Modal>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error("useConfirm must be used within ConfirmProvider");
  }
  return ctx;
}
