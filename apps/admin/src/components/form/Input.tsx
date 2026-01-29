import { Input as HeadlessInput, type InputProps } from "@headlessui/react";
import React from "react";

type Props = Omit<InputProps, "className">;

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <HeadlessInput
      ref={ref}
      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
