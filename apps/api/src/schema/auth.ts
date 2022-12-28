import { z } from "zod"

export const changePasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .refine((val) => val.toLocaleLowerCase()),
  password: z.string().min(6),
})

export const confirmOTPSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .refine((val) => val.toLocaleLowerCase()),
  otp: z.string().length(4),
})

export const emailExistSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .refine((val) => val.toLocaleLowerCase()),
})

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .refine((val) => val.toLocaleLowerCase()),
  password: z.string().min(6),
})

export const sendOTPSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .refine((val) => val.toLocaleLowerCase()),
})

export const signUpSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .refine((val) => val.toLocaleLowerCase()),
  password: z.string().min(6),
  fullName: z.string(),
  phone: z.string().min(5, { message: "Number must be at least 5 Numbers" }),
  street: z.string(),
  state: z.string(),
  city: z.string(),
  country: z.string(),
})
