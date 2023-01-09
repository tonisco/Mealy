import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"

import { MainScreenType } from "../screenTypes/home"
import HomeNavigator from "./HomeNavigator"

const Tab = createBottomTabNavigator<MainScreenType>()

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={HomeNavigator} />
    </Tab.Navigator>
  )
}

export default MainNavigator
