import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Onboarding } from "mobile-ui"
import React from "react"
import { Image, StyleSheet } from "react-native"

import { OnboardingStack } from "../../constants/screen"

type Props = NativeStackScreenProps<OnboardingStack, "Onboarding 1">

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
      ImageComponent={
        <Image
          style={styles.imageSize}
          source={require("../../../assets/images/Onboarding1.png")}
          resizeMode="contain"
        />
      }
    />
  )
}

const styles = StyleSheet.create({
  imageSize: { height: 200, width: 200 },
})

export default OnboardingOne
