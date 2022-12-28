import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Onboarding, UseUserState } from "mobile-ui"
import { OnboardingScreenType } from "mobile-ui/src/screenTypes/default"
import React from "react"

type Props = NativeStackScreenProps<OnboardingScreenType, "Onboarding 3">

const OnboardingThree = ({ navigation }: Props) => {
  const { setHasOpenedApp } = UseUserState()

  const nextPage = () => {
    setHasOpenedApp(true)
    navigation.navigate("Auth", {
      screen: "Sign Up",
      params: { animation: true },
    })
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
