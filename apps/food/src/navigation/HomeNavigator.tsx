import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

import { HomeScreenType } from "../screenTypes/home"
import HomeScreen from "../screens/home/HomeScreen"

const Stack = createNativeStackNavigator<HomeScreenType>()

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default HomeNavigator
