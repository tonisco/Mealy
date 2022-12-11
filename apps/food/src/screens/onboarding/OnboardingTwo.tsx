import { StackScreenProps } from "@react-navigation/stack"
import { Onboarding } from "mobile-ui"
import React from "react"
import { Image } from "react-native"

import { OnboardingStack } from "../../constants/screen"

type Props = StackScreenProps<OnboardingStack, "Onboarding 2">

const OnboardingTwo = ({ navigation }: Props) => {
  const nextPage = () => {
    navigation.navigate("Onboarding 3")
  }

  return (
    <Onboarding
      heading="Fast Delivery"
      description="Fast food delivery to your home, office wherever you are"
      page={2}
      onPress={nextPage}
      Image={
        <Image
          style={{ height: 184, width: 184 }}
          source={require("../../../assets/onboarding4.png")}
          resizeMode={"contain"}
        />
      }
    />
  )
}

export default OnboardingTwo
