import { UserStore, UseUserState } from "@context"
import { API_URL, PORT } from "@env"
import { NavigationContainer } from "@react-navigation/native"
import { TrpcProvider } from "@trpcConfig"
import Constants from "expo-constants"
import { loadAsync } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"

import Navigator from "./navigation/Navigator"

const getBaseUrl = () => {
  const localhost = Constants.manifest?.debuggerHost?.split(":")[0]

  if (!localhost)
    throw new Error("failed to get localhost, configure it manually")

  return API_URL ? `${API_URL}` : `http://${localhost}:${PORT}`
}

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false)

  const { getDetailsFromStorage, user } = UseUserState()

  useEffect(() => {
    const getAppReady = async () => {
      await SplashScreen.preventAutoHideAsync()

      await getDetailsFromStorage()

      await loadAsync({
        "font-bold": require("../assets/font/BentonSansBold.otf"),
        "font-medium": require("../assets/font/BentonSansMedium.otf"),
        "font-regular": require("../assets/font/BentonSansRegular.otf"),
      })
    }
    getAppReady()
      .catch(console.warn)
      .finally(() => setAppIsReady(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
      console.log("redone")
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <TrpcProvider port={getBaseUrl()} token={user.token}>
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
