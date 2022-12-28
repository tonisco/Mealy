import { API_URL } from "@env"
import { NavigationContainer } from "@react-navigation/native"
import Constants from "expo-constants"
import { loadAsync } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { UserStore, UseUserState } from "mobile-ui"
import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"
import { TrpcProvider } from "trpc-client/index"

import Navigator from "./navigation/Navigator"

const getBaseUrl = () => {
  const localhost = Constants.manifest?.debuggerHost?.split(":")[0]
  if (!localhost)
    throw new Error("failed to get localhost, configure it manually")

  return API_URL ? `${API_URL}` : `http://${localhost}:3456`
}

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false)

  const { getDetailsFromStorage } = UseUserState()

  useEffect(() => {
    const loadAssets = async () => {
      await SplashScreen.preventAutoHideAsync()
      try {
        await getDetailsFromStorage()
        await loadAsync({
          "font-bold": require("../assets/font/BentonSansBold.otf"),
          "font-medium": require("../assets/font/BentonSansMedium.otf"),
          "font-regular": require("../assets/font/BentonSansRegular.otf"),
        })
      } catch (error) {
        console.warn(error)
      } finally {
        setAppIsReady(true)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadAssets()
  }, [getDetailsFromStorage])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
      console.log("redone")
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }
  console.log("here")
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <TrpcProvider port={getBaseUrl()}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </TrpcProvider>
    </View>
  )
}

export default () => (
  <UserStore>
    <App />
  </UserStore>
)
