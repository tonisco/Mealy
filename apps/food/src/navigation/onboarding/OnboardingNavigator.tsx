import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack"
import * as React from "react"

import { OnboardingStack } from "../../constants/screen"
import {
  OnboardingOne,
  OnboardingThree,
  OnboardingTwo,
} from "../../screens/onboarding"

const Stack = createStackNavigator<OnboardingStack>()

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Onboarding 1" component={OnboardingOne} />
      <Stack.Screen name="Onboarding 2" component={OnboardingTwo} />
      <Stack.Screen name="Onboarding 3" component={OnboardingThree} />
    </Stack.Navigator>
  )
}

export default OnboardingNavigator
