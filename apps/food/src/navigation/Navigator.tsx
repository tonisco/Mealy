import { UseUserState } from "mobile-ui"
import React from "react"

import AuthNavigator from "./AuthNavigator"
import OnboardingNavigator from "./OnboardingNavigator"

const Navigator = () => {
  const { hasOpenedApp } = UseUserState()

  if (!hasOpenedApp) return <OnboardingNavigator />

  return <AuthNavigator />
}

export default Navigator
