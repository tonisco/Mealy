import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Pressable } from "react-native"

import Colors from "../utils/Colors"
import IsIos from "../utils/IsIos"

const BackButton = () => {
  const { goBack, canGoBack } = useNavigation()

  return (
    <Pressable
      onPress={() => canGoBack() && goBack()}
      className="mb-6 self-start rounded-lg bg-lite-gray p-1"
    >
      <Ionicons
        name={IsIos ? "ios-chevron-back" : "chevron-back"}
        size={25}
        color={Colors.darkGreen}
      />
    </Pressable>
  )
}

export default BackButton
