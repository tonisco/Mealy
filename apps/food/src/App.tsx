import { NavigationContainer } from "@react-navigation/native"
import { useFonts } from "expo-font"
import Constants from "expo-constants"
import * as SplashScreen from "expo-splash-screen"
import React from "react"
import { TrpcProvider } from "trpc-client/src/TrpcProvider"

import AuthNavigator from "./navigation/AuthNavigator"

// import OnboardingNavigator from "./navigation/OnboardingNavigator"

// eslint-disable-next-line @typescript-eslint/no-floating-promises
SplashScreen.preventAutoHideAsync()

const getBaseUrl = () => {
  const localhost = Constants.manifest?.debuggerHost?.split(":")[0]
  if (!localhost)
    throw new Error("failed to get localhost, configure it manually")
  return `http://${localhost}:3000`
}

export default function App() {
  const [FontsLoaded] = useFonts({
    "font-bold": require("../assets/font/BentonSansBold.otf"),
    "font-medium": require("../assets/font/BentonSansMedium.otf"),
    "font-regular": require("../assets/font/BentonSansRegular.otf"),
  })

  if (!FontsLoaded) return null
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  else SplashScreen.hideAsync()

  return (
    <TrpcProvider port={getBaseUrl()}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </TrpcProvider>
  )
}
