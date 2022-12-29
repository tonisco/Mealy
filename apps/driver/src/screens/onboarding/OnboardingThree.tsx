import { Onboarding, UseUserState } from "mobile-ui"
import React from "react"

const OnboardingThree = () => {
  const { saveHasOpenedApp } = UseUserState()

  const nextPage = async () => {
    await saveHasOpenedApp()
  }

  return (
    <Onboarding
      heading="free work hours"
      description="free time during work hours"
      page={3}
      onPress={nextPage}
      ImageLink={require("../../../assets/images/Onboarding3.png")}
    />
  )
}

export default OnboardingThree
