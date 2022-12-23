import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Onboarding } from "mobile-ui"
import React from "react"
import { StyleSheet } from "react-native"

import { OnboardingStack } from "../types"

type Props = NativeStackScreenProps<OnboardingStack, "Onboarding 2">

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
      ImageLink={require("../../../assets/images/Onboarding2.png")}
      ImageStyleProp={styles.imageSize}
    />
  )
}

const styles = StyleSheet.create({
  imageSize: {
    transform: [{ translateY: 20 }],
  },
})

export default OnboardingTwo
