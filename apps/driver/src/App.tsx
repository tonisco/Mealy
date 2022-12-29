import { NavigationContainer } from "@react-navigation/native"
import { loadAsync } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { UserStore, UseUserState } from "mobile-ui"
import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"

import Navigator from "./navigation/Navigator"

export const App = () => {
  const [appIsReady, setAppIsReady] = useState(false)

  const { getDetailsFromStorage } = UseUserState()

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
  }, [getDetailsFromStorage])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync()
  }, [appIsReady])

  if (!appIsReady) return null

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </View>
  )
}

export default () => (
  <UserStore>
    <App />
  </UserStore>
)
