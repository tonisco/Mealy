import { NavigationContainer } from "@react-navigation/native"
import { UseUserState } from "mobile-ui"
import React from "react"

import AuthNavigator from "./AuthNavigator"
import OnboardingNavigator from "./OnboardingNavigator"

const NavigatorContainer = () => {
  const { hasOpenedApp } = UseUserState()

  return (
    <NavigationContainer>
      {hasOpenedApp ? <AuthNavigator /> : <OnboardingNavigator />}
    </NavigationContainer>
  )
}

export default NavigatorContainer
