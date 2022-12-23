import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Onboarding } from "mobile-ui"
import { OnboardingScreenType } from "mobile-ui/src/screenTypes/default"
import React from "react"

type Props = NativeStackScreenProps<OnboardingScreenType, "Onboarding 1">

const OnboardingOne = ({ navigation }: Props) => {
  const nextPage = () => {
    navigation.navigate("Onboarding 2")
  }

  return (
    <Onboarding
      heading="high commission"
      description="Earn a fair commission on every delivery based on the distance"
      page={1}
      onPress={nextPage}
      ImageLink={require("../../../assets/images/Onboarding1.png")}
    />
  )
}

export default OnboardingOne
