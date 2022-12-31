import { z } from "zod"

const schemaItems = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid mail" })
    .refine((val) => val.toLocaleLowerCase()),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 5 characters" }),
  confirmPassword: z.string(),
  otp: z.string().length(4),
  fullName: z.string(),
  phone: z.string().min(5, { message: "Number must be at least 5 Numbers" }),
  street: z.string(),
  state: z.string(),
  city: z.string(),
  country: z.string(),
})

export const emailExistSchema = schemaItems.pick({ email: true })

export const changePasswordSchema = schemaItems.pick({
  email: true,
  password: true,
})

export const confirmOTPSchema = schemaItems.pick({ email: true, otp: true })

export const loginSchema = schemaItems.pick({
  email: true,
  password: true,
})

export const sendOTPSchema = schemaItems.pick({ email: true })

export const signUpSchema = schemaItems.pick({
  city: true,
  country: true,
  email: true,
  fullName: true,
  password: true,
  phone: true,
  state: true,
  street: true,
})

export const changePasswordFormSchema = schemaItems
  .pick({ password: true, confirmPassword: true })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export const DetailsFormSchema = schemaItems.pick({ phone: true }).extend({
  firstName: z
    .string()
    .min(3, { message: "First Name must contain at least 3 characters" })
    .trim(),
  lastName: z
    .string()
    .min(3, { message: "Last Name must contain at least 3 characters" })
    .trim(),
})

export const locationFormSchema = schemaItems.pick({
  street: true,
  city: true,
  state: true,
  country: true,
})

export const signUpFormSchema = schemaItems
  .pick({ email: true, password: true, confirmPassword: true })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export const otpFormSchema = z.object({
  pin1: z.string().length(1),
  pin2: z.string().length(1),
  pin3: z.string().length(1),
  pin4: z.string().length(1),
})
export type OtpFormSchema = z.infer<typeof otpFormSchema>

export const resetPasswordSchema = schemaItems.pick({ email: true })
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
