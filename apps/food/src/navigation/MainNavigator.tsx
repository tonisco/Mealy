import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"

import BottomTabIcon from "../components/BottomTabIcon"
import { MainScreenType } from "../screenTypes/home"
import Orders from "../screens/main/Orders"
import Search from "../screens/main/Search"
import User from "../screens/main/User"
import HomeNavigator from "./HomeNavigator"

const Tab = createBottomTabNavigator<MainScreenType>()

const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Main"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarButton: (props) =>
            BottomTabIcon({ title: "Home", iconName: "home", ...props }),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarButton: (props) =>
            BottomTabIcon({ title: "Search", iconName: "search", ...props }),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarLabel: "Orders",
          tabBarButton: (props) =>
            BottomTabIcon({ title: "Orders", iconName: "document", ...props }),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarLabel: "User",
          tabBarButton: (props) =>
            BottomTabIcon({ title: "Users", iconName: "person", ...props }),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
