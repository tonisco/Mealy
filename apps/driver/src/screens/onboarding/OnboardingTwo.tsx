import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Onboarding } from "mobile-ui"
import React from "react"
import { Image, StyleSheet } from "react-native"

import { OnboardingStack } from "../types"

type Props = NativeStackScreenProps<OnboardingStack, "Onboarding 2">

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
      ImageComponent={
        <Image
          style={styles.imageSize}
          source={require("../../../assets/images/Onboarding2.png")}
          resizeMode="contain"
        />
      }
    />
  )
}

const styles = StyleSheet.create({
  imageSize: {
    height: 200,
    width: 200,
  },
})

export default OnboardingTwo
