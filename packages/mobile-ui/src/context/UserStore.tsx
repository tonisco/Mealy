import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { createContext, ReactNode, useContext, useState } from "react"
import { Alert } from "react-native"

type userContext = {
  hasOpenedApp: boolean
  saveHasOpenedApp: (value: boolean) => Promise<void>
  user: object
  saveUser: (value: object) => Promise<void>
  getDetailsFromStorage: () => Promise<void>
}

const UserContext = createContext<userContext | null>(null)

const UserStore = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({})
  const [hasOpenedApp, setHasOpenedApp] = useState(false)

  const saveHasOpenedApp = async (value: boolean) => {
    try {
      await AsyncStorage.setItem("hasOpenedApp", JSON.stringify(value))
      setHasOpenedApp(value)
    } catch (error) {
      Alert.alert("App Error", "Failed to save changes")
    }
  }

  const saveUser = async (value: object) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(value))
      setUser(value)
    } catch (error) {
      Alert.alert("App Error", "App faild to save user changes")
    }
  }

  const getDetailsFromStorage = async () => {
    try {
      const userDetails = await AsyncStorage.getItem("user")
      if (userDetails) setUser(JSON.parse(userDetails) as userContext["user"])
      const openedApp = await AsyncStorage.getItem("hasOpenedApp")
      if (openedApp) setHasOpenedApp(JSON.parse(openedApp) as boolean)
    } catch (error) {}
  }

  return (
    <UserContext.Provider
      value={{
        hasOpenedApp,
        saveHasOpenedApp,
        saveUser,
        user,
        getDetailsFromStorage,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UseUserState = () => {
  const context = useContext(UserContext)

  if (!context) throw new Error("User Context not available at this location")

  return context
}

export default UserStore
