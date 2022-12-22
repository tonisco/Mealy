import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as React from "react"

import {
  OnboardingOne,
  OnboardingThree,
  OnboardingTwo,
} from "../screens/onboarding"
import { OnboardingStack } from "../screens/types"
import AuthNavigator from "./AuthNavigator"

const Stack = createNativeStackNavigator<OnboardingStack>()

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
      <Stack.Screen name="Auth" component={AuthNavigator} />
    </Stack.Navigator>
  )
}

export default OnboardingNavigator
