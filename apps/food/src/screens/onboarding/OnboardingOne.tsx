import { StackScreenProps } from "@react-navigation/stack"
import { Onboarding } from "mobile-ui"
import React from "react"
import { Image } from "react-native"

import { OnboardingStack } from "../../constants/screen"

type Props = StackScreenProps<OnboardingStack, "Onboarding 1">

const OnboardingOne = ({ navigation }: Props) => {
  const nextPage = () => {
    navigation.navigate("Onboarding 2")
  }

  return (
    <Onboarding
      heading="Order a Tasty Dish"
      description="Discover the best foods from over 1,000 restaurants and fast delivery to your doorstep"
      page={1}
      onPress={nextPage}
      Image={
        <Image
          style={{ height: 200, width: 200 }}
          source={require("../../../assets/Onboarding1.png")}
          resizeMode={"contain"}
        />
      }
    />
  )
}

export default OnboardingOne
