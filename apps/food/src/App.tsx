import { NavigationContainer } from "@react-navigation/native"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { useCallback } from "react"
import { View } from "react-native"

import OnboardingNavigator from "./navigation/onboarding/OnboardingNavigator"

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [FontsLoaded] = useFonts({
    "font-bold": require("../assets/font/BentonSans Bold.otf"),
    "font-medium": require("../assets/font/BentonSans Medium.otf"),
    "font-regular": require("../assets/font/BentonSans Regular.otf"),
  })

  const appReady = useCallback(async () => {
    if (FontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [FontsLoaded])

  if (!FontsLoaded) return null

  return (
    <View onLayout={appReady}>
      <NavigationContainer>
        <OnboardingNavigator />
      </NavigationContainer>
    </View>
  )
}
