import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Onboarding } from "mobile-ui"
import { OnboardingScreenType } from "mobile-ui/src/screenTypes/default"
import React from "react"

type Props = NativeStackScreenProps<OnboardingScreenType, "Onboarding 2">

const OnboardingTwo = ({ navigation }: Props) => {
  const nextPage = () => {
    navigation.navigate("Onboarding 3")
  }

  return (
    <Onboarding
      heading="Map Navigation"
      description="Use the in-app map to navigate and locate your delivery location"
      page={2}
      onPress={nextPage}
      ImageLink={require("../../../assets/images/Onboarding2.png")}
    />
  )
}

export default OnboardingTwo
