import { StackScreenProps } from "@react-navigation/stack"
import { Onboarding } from "mobile-ui"
import React from "react"
import { Image } from "react-native"

import { OnboardingStack } from "../../constants/screen"

type Props = StackScreenProps<OnboardingStack, "Onboarding 3">

const OnboardingThree = ({ navigation }: Props) => {
  const nextPage = () => {
    navigation.navigate("Onboarding 1")
  }

  return (
    <Onboarding
      heading="Live Tracking"
      description="Real time tracking of your food on the app once you placed the order"
      page={3}
      onPress={nextPage}
      Image={
        <Image
          style={{ height: 200, width: 200 }}
          source={require("../../../assets/Onboarding3.png")}
          resizeMode={"contain"}
        />
      }
    />
  )
}

export default OnboardingThree
