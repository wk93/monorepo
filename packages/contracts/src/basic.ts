import { z } from "zod";

import { Error } from "./error-codes";

export const RequiredString = z
  .string()
  .min(1, { message: Error.REQUIRED_FIELD });

export const Email = z.email({ message: Error.INVALID_ADDRESS_EMAIL });

export const Password = RequiredString.min(8, { message: Error.MIN_LENGTH(8) })
  .regex(/[a-z]/, { message: Error.REQUIRED_LOWERCASE })
  .regex(/[A-Z]/, { message: Error.REQUIRED_UPPERCASE })
  .regex(/\d/, { message: Error.REQUIRED_DIGIT })
  .regex(/[^A-Za-z0-9]/, { message: Error.REQUIRED_SPECIAL });
