import { Error } from "@mono/contracts";

import { getErrorMessage } from "@/utils/error-messages";

interface Props {
  isTouched?: boolean;
  errors: { message: string }[];
}

const PasswordHelpers: React.FC<Props> = ({ isTouched, errors }) => {
  const hasError = (key: string) =>
    errors.map((e) => e.message).includes(key)
      ? "text-red-500"
      : "text-green-500";

  const color = (key: string) => (!isTouched ? "text-gray-500" : hasError(key));

  return (
    <ul className="text-xs mt-1">
      {[
        "MIN_LENGTH_8",
        Error.REQUIRED_LOWERCASE,
        Error.REQUIRED_UPPERCASE,
        Error.REQUIRED_DIGIT,
        Error.REQUIRED_SPECIAL,
        "PASSWORDS_NOT_MATCHING",
      ].map((i) => (
        <li key={i} className={color(i)}>
          {getErrorMessage(i)}
        </li>
      ))}
    </ul>
  );
};

export default PasswordHelpers;
