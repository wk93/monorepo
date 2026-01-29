import { Error } from "@mono/contracts";

export const ErrorMessages: Record<string, string> = {
  [Error.REQUIRED_FIELD]: "Pole wymagane",
  [Error.INVALID_ADDRESS_EMAIL]: "Niepoprawny adres e-mail",

  MIN_LENGTH: "Wymagana minimalna liczba znaków",

  [Error.REQUIRED_LOWERCASE]: "Wymagana mała litera",
  [Error.REQUIRED_UPPERCASE]: "Wymagana wielka litera",
  [Error.REQUIRED_DIGIT]: "Wymagana cyfra",
  [Error.REQUIRED_SPECIAL]: "Wymagany znak specjalny",

  PASSWORDS_NOT_MATCHING: "Hasła muszą być takie same",
} as const;

export function getErrorMessage(code: string): string {
  const m = /^MIN_LENGTH_(\d+)$/.exec(code);
  if (m?.[1]) return `Wymagane min. ${m[1]} znaków`;

  if (ErrorMessages[code]) return ErrorMessages[code];

  return "Niepoprawna wartość";
}
