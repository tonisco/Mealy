import { Onboarding } from "mobile-ui"
import React from "react"
import { Image } from "react-native"

const OnboardingOne = () => {
  const nextPage = () => {
    console.log("first")
  }

  return (
    <Onboarding
      heading="Order a Tasty Dish"
      description="Discover the best foods from over 1,000 restaurants and fast delivery to your doorstep"
      page={1}
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

export default OnboardingOne
