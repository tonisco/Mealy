import { UseUserState } from "mobile-ui"
import React from "react"

import AuthNavigator from "./AuthNavigator"
import MainNavigator from "./MainNavigator"
import OnboardingNavigator from "./OnboardingNavigator"

const Navigator = () => {
  const { hasOpenedApp, user } = UseUserState()

  if (!hasOpenedApp) return <OnboardingNavigator />

  if (!user.token) return <AuthNavigator />

  return <MainNavigator />
}

export default Navigator
