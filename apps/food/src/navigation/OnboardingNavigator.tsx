import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { OnboardingScreenType } from "mobile-ui/src/screenTypes/default"
import * as React from "react"

import {
  OnboardingOne,
  OnboardingThree,
  OnboardingTwo,
} from "../screens/onboarding"

const Stack = createNativeStackNavigator<OnboardingScreenType>()

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Onboarding 1" component={OnboardingOne} />
      <Stack.Screen name="Onboarding 2" component={OnboardingTwo} />
      <Stack.Screen name="Onboarding 3" component={OnboardingThree} />
      <Stack.Screen name="Auth" component={OnboardingNavigator} />
    </Stack.Navigator>
  )
}

export default OnboardingNavigator
