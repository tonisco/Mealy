export type OnboardingScreenType = {
  "Onboarding 1": undefined
  "Onboarding 2": undefined
  "Onboarding 3": undefined
}

export type AuthScreenType = {
  "Sign Up": { animation: boolean }
  "Log In": { animation: boolean }
  "Details Form": undefined
  "Location Form": undefined
  "Reset Password": undefined
  "OTP Form": { email: string }
  "Change Password": { email: string }
  "Success Screen": {
    message: string
    nextScreen: keyof AuthScreenType
    nextScreenParams?: object | { animation: boolean }
  }
  "Failure Screen": {
    message: string
    nextScreen: keyof AuthScreenType
    nextScreenParams?: object | { animation: boolean }
  }
}
