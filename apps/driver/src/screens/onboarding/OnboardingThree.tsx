import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Onboarding } from "mobile-ui"
import React from "react"

import { OnboardingStack } from "../types"

type Props = NativeStackScreenProps<OnboardingStack, "Onboarding 3">

const OnboardingThree = ({ navigation }: Props) => {
  const nextPage = () => {
    navigation.navigate("Auth", { screen: "Sign Up" })
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
