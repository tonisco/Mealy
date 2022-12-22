import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Onboarding } from "mobile-ui"
import React from "react"
import { Image, StyleSheet } from "react-native"

import { OnboardingStack } from "../../constants/screen"

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
    transform: [{ translateY: 20 }],
  },
})

export default OnboardingTwo
