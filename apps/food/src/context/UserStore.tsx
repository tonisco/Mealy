import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { createContext, ReactNode, useContext, useState } from "react"
import { Alert } from "react-native"

type User = {
  token: string
  id: string
  fullName: string
  email: string
  phone: string
  country: string
  state: string
  city: string
  street: string
  lat: string | null
  lng: string | null
  created_at: Date | string
}

const initialUserState = {
  token: "",
  id: "",
  fullName: "",
  email: "",
  phone: "",
  country: "",
  state: "",
  city: "",
  street: "",
  created_at: "",
  lat: "",
  lng: "",
}

type userContext = {
  hasOpenedApp: boolean
  saveHasOpenedApp: () => Promise<void>
  user: User
  saveUser: (value: User) => Promise<void>
  getDetailsFromStorage: () => Promise<void>
  hasSignedUp: boolean
  logoutUser: () => Promise<void>
}

const UserContext = createContext<userContext | null>(null)

const UserStore = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(initialUserState)
  const [hasOpenedApp, setHasOpenedApp] = useState(false)
  const [hasSignedUp, setHasSignedUp] = useState(false)

  const saveHasOpenedApp = async () => {
    try {
      await AsyncStorage.setItem("hasOpenedApp", JSON.stringify(true))
      setHasOpenedApp(true)
    } catch (error) {
      Alert.alert("App Error", "Failed to save changes")
    }
  }

  const saveUser = async (value: User) => {
    try {
      await AsyncStorage.setItem("hasSignedUp", JSON.stringify(true))
      await AsyncStorage.setItem("user", JSON.stringify(value))
      setHasSignedUp(true)
      setUser(value)
    } catch (error) {
      Alert.alert("App Error", "App faild to save user changes")
    }
  }

  // TODO: make fetch from storage into one request
  const getDetailsFromStorage = async () => {
    try {
      const userDetails = await AsyncStorage.getItem("user")
      if (userDetails) setUser(JSON.parse(userDetails) as userContext["user"])
      const openedApp = await AsyncStorage.getItem("hasOpenedApp")
      if (openedApp) setHasOpenedApp(JSON.parse(openedApp) as boolean)
      const signedUp = await AsyncStorage.getItem("hasSignedUp")
      if (signedUp) setHasSignedUp(JSON.parse(signedUp) as boolean)
    } catch (error) {
      console.log(error)
    }
  }

  const logoutUser = async () => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(initialUserState))
      setUser(initialUserState)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        hasSignedUp,
        hasOpenedApp,
        saveHasOpenedApp,
        saveUser,
        user,
        getDetailsFromStorage,
        logoutUser,
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
