export type OnboardingScreenType = {
  "Onboarding 1": undefined
  "Onboarding 2": undefined
  "Onboarding 3": undefined
}

export type AuthScreenType = {
  "Sign Up": { animation?: boolean } | undefined
  "Log In": { animation?: boolean } | undefined
  "Details Form": undefined
  "Location Form": undefined
  "Reset Password": undefined
  "OTP Form": undefined
  "Change Password": undefined
  // TODO: Fix next screen typeChecking
  "Success Screen": { message: string; nextScreen: keyof AuthScreenType }
  "Failure Screen": { message: string; nextScreen: keyof AuthScreenType }
}
