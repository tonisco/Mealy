import { z } from "zod"

export const emailExistSchema = z.object({
  email: z
    .string()
    .email()
    .trim()
    .refine((val) => val.toLocaleLowerCase()),
})

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .trim()
    .refine((val) => val.toLocaleLowerCase()),
  password: z.string().min(6),
})

export const signUpSchema = z.object({
  email: z
    .string()
    .email()
    .trim()
    .refine((val) => val.toLocaleLowerCase()),
  password: z.string().min(6),
  fullName: z.string(),
  phone: z.string().min(5, { message: "Number must be at least 5 Numbers" }),
  street: z.string(),
  state: z.string(),
  city: z.string(),
  country: z.string(),
})
