import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Onboarding } from "mobile-ui"
import React from "react"
import { Image, StyleSheet } from "react-native"

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
      ImageComponent={
        <Image
          style={styles.imageSize}
          source={require("../../../assets/images/Onboarding3.png")}
          resizeMode="contain"
        />
      }
    />
  )
}

const styles = StyleSheet.create({
  imageSize: { height: 200, width: 200 },
})

export default OnboardingThree
