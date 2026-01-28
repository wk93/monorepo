import {
  CheckIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import hotT from "react-hot-toast";

interface Props {
  title?: string;
  message?: string;
  type?: "info" | "success" | "error" | "neutral";
  duration?: number;
}

const toast = ({
  type = "success",
  title,
  message,
  duration = 2000,
}: Props = {}) => {
  const Icon =
    type === "success"
      ? CheckIcon
      : type === "error"
        ? XMarkIcon
        : InformationCircleIcon;
  return hotT.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-gray-200 ring-opacity-5`}
      >
        {type !== "neutral" && (
          <div className="px-2 flex items-center">
            <div
              className={clsx(
                type === "success"
                  ? "bg-green-500"
                  : type === "error"
                    ? "bg-red-500"
                    : "bg-blue-500",
                "p-1 rounded-full text-white",
              )}
            >
              <Icon className="w-4 h-4" />
            </div>
          </div>
        )}
        <div className="flex-1 w-0 p-1 flex items-center">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">
              {title ?? message}
            </p>
            {message && title && (
              <p
                className={clsx(title ? "mt-0.5" : "", "text-xs text-gray-500")}
              >
                {message}
              </p>
            )}
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => {
              hotT.remove(t.id);
            }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    ),
    { duration },
  );
};

export default toast;
