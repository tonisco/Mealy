import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as React from "react"

import { OnboardingOne } from "../screens/onboarding"
import { OnboardingStack } from "../screens/types"

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
    </Stack.Navigator>
  )
}

export default OnboardingNavigator
