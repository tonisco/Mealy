import { Onboarding, UseUserState } from "mobile-ui"
import React from "react"

const OnboardingThree = () => {
  const { saveHasOpenedApp } = UseUserState()

  const nextPage = async () => {
    await saveHasOpenedApp()
  }

  return (
    <Onboarding
      heading="Live Tracking"
      description="Real time tracking of your food on the app once you placed the order"
      page={3}
      onPress={nextPage}
      ImageLink={require("../../../assets/images/Onboarding3.png")}
    />
  )
}

export default OnboardingThree
