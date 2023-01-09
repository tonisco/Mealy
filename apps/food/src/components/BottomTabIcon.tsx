import { Ionicons } from "@expo/vector-icons"
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs"
import React from "react"
import { View, Text } from "react-native"

type Props = BottomTabBarButtonProps & {
  title: string
  iconName: keyof typeof Ionicons.glyphMap
}

const BottomTabIcon = ({ title, accessibilityState }: Props) => {
  console.log(accessibilityState)
  return (
    <View className="flex-1">
      <Text>{title}</Text>
    </View>
  )
}

export default BottomTabIcon
