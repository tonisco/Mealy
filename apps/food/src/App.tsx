import { NavigationContainer } from "@react-navigation/native"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"

import AuthNavigator from "./navigation/AuthNavigator"

// import OnboardingNavigator from "./navigation/OnboardingNavigator"

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [FontsLoaded] = useFonts({
    "font-bold": require("../assets/font/BentonSansBold.otf"),
    "font-medium": require("../assets/font/BentonSansMedium.otf"),
    "font-regular": require("../assets/font/BentonSansRegular.otf"),
  })

  if (!FontsLoaded) return null
  else SplashScreen.hideAsync()

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  )
}
