import { Ionicons } from "@expo/vector-icons"
import { IsIos, UseUserState } from "mobile-ui"
import React from "react"
import { View, Text } from "react-native"

const AddessInput = () => {
  const {
    user: { city, country, state, street },
  } = UseUserState()

  return (
    <View className="flex-row items-center gap-x-4 bg-white">
      <Ionicons
        name={IsIos ? "ios-location-sharp" : "location-sharp"}
        size={24}
      />

      <View className="gap-y-1">
        <Text className="font-bento-med text-xs text-lite-gray">
          Delivering to
        </Text>
        <Text className="font-bento-med text-xs capitalize text-dark">
          {`${street}, ${city}, ${state}, ${country}`}
        </Text>
      </View>
    </View>
  )
}

export default AddessInput
