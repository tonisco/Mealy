import { UseUserState } from "mobile-ui"
import React from "react"

import AuthNavigator from "./AuthNavigator"
import HomeNavigator from "./HomeNavigator"
import OnboardingNavigator from "./OnboardingNavigator"

const Navigator = () => {
  const { hasOpenedApp, user } = UseUserState()

  if (!hasOpenedApp) return <OnboardingNavigator />

  if (!user.token) return <AuthNavigator />

  return <HomeNavigator />
}

export default Navigator
