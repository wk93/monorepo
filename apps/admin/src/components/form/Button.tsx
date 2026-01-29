import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";
import React from "react";

import LoadingIcon from "../feedback/LoadingIcon";

interface ButtonProps extends Omit<HeadlessButtonProps, "className"> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading = false, children, ...props }, ref) => {
    return (
      <HeadlessButton
        ref={ref}
        {...props}
        className="rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      >
        {isLoading ? (
          <span className="w-full flex items-center justify-center">
            <LoadingIcon className="size-5" />
          </span>
        ) : (
          children
        )}
      </HeadlessButton>
    );
  },
);

Button.displayName = "Button";

export default Button;
