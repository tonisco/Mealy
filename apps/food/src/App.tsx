import { NavigationContainer } from "@react-navigation/native"
import Constants from "expo-constants"

import OnboardingNavigator from "./navigation/onboarding/OnboardingNavigator"

export default function App() {
  return (
    <NavigationContainer>
      <OnboardingNavigator />
    </NavigationContainer>
  )
}
