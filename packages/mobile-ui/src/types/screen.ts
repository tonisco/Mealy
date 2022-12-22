export type OnboardingStack = {
  "Onboarding 1": undefined
  "Onboarding 2": undefined
  "Onboarding 3": undefined
}

export type AuthStack = {
  "Sign Up": { animation?: boolean }
  "Log In": { animation?: boolean }
  "Details Form": undefined
  "Location Form": undefined
  "Reset Password": undefined
  "OTP Form": undefined
  "Change Password": undefined
  // TODO: Fix next screen typeChecking
  "Success Screen": { message: string; nextScreen: keyof AuthStack }
  "Failure Screen": { message: string; nextScreen: keyof AuthStack }
}