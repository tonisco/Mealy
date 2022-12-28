import { API_URL } from "@env"
import Constants from "expo-constants"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { UserStore } from "mobile-ui"
import React from "react"
import { TrpcProvider } from "trpc-client/index"

import NavigationContainer from "./navigation/NavigatorContainer"

// eslint-disable-next-line @typescript-eslint/no-floating-promises
SplashScreen.preventAutoHideAsync()

const getBaseUrl = () => {
  const localhost = Constants.manifest?.debuggerHost?.split(":")[0]
  if (!localhost)
    throw new Error("failed to get localhost, configure it manually")

  return API_URL ? `${API_URL}` : `http://${localhost}:3456`
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
      <UserStore>
        <NavigationContainer />
      </UserStore>
    </TrpcProvider>
  )
}
