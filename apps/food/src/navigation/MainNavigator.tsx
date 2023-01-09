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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 80, paddingHorizontal: 15 },
      }}
    >
      <Tab.Screen
        name="Main"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarButton: (props) =>
            BottomTabIcon({
              title: "Home",
              image: require("../../assets/images/icons/Home.png"),
              ...props,
            }),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarButton: (props) =>
            BottomTabIcon({
              title: "Search",
              image: require("../../assets/images/icons/Search.png"),
              ...props,
            }),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarLabel: "Orders",
          tabBarButton: (props) =>
            BottomTabIcon({
              title: "Orders",
              image: require("../../assets/images/icons/Document.png"),
              ...props,
            }),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarLabel: "User",
          tabBarButton: (props) =>
            BottomTabIcon({
              title: "Users",
              image: require("../../assets/images/icons/Profile.png"),
              ...props,
            }),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
