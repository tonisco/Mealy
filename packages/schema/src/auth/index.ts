import { z } from "zod"

export const wrongEmailMessage = "Please enter a valid mail"
export const wrongFirstNameMessage =
  "First Name must contain at least 3 characters"
export const wrongLastNameMessage =
  "Last Name must contain at least 3 characters"
export const wrongPasswordMessage = "Password must be atleast 6 characters"
export const requiredPasswordMessage = "This field is required"
export const wrongPhoneMessage = "Number must be at least 5 Numbers"
export const passwordNotMatchMessage = "Passwords do not match"

const schemaItems = z.object({
  email: z
    .string()
    .trim()
    .email({ message: wrongEmailMessage })
    .refine((val) => val.toLocaleLowerCase()),
  password: z.string().min(6, { message: wrongPasswordMessage }),
  confirmPassword: z.string(),
  otp: z.string().length(4),
  fullName: z.string(),
  phone: z.string().min(5, { message: wrongPhoneMessage }),
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

export const loginSchema = schemaItems.pick({ email: true }).extend({
  password: z.string().min(1, { message: requiredPasswordMessage }),
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
    message: passwordNotMatchMessage,
  })
export type ChangePasswordFormSchema = z.infer<typeof changePasswordFormSchema>

export const detailsFormSchema = schemaItems.pick({ phone: true }).extend({
  firstName: z.string().min(3, { message: wrongFirstNameMessage }).trim(),
  lastName: z.string().min(3, { message: wrongLastNameMessage }).trim(),
})
export type DetailsFormSchema = z.infer<typeof detailsFormSchema>

export const locationFormSchema = schemaItems.pick({
  street: true,
  city: true,
  state: true,
  country: true,
})
export type LocationFormSchema = z.infer<typeof locationFormSchema>

export const signUpFormSchema = schemaItems
  .pick({ email: true, password: true, confirmPassword: true })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: passwordNotMatchMessage,
  })
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>

export const otpFormSchema = z.object({
  pin1: z.string().length(1),
  pin2: z.string().length(1),
  pin3: z.string().length(1),
  pin4: z.string().length(1),
})
export type OtpFormSchema = z.infer<typeof otpFormSchema>

export const resetPasswordFormSchema = schemaItems.pick({ email: true })
export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>

export const loginFormSchema = loginSchema

export type LoginFormSchema = z.infer<typeof loginFormSchema>
