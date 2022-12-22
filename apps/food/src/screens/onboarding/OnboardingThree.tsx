import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Onboarding } from "mobile-ui"
import React from "react"
import { Image, StyleSheet } from "react-native"

import { OnboardingStack } from "../../constants/screen"

type Props = NativeStackScreenProps<OnboardingStack, "Onboarding 3">

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
