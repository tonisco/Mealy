import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import Colors from "mobile-constants/src/Colors"
import React from "react"
import { StyleSheet, Pressable } from "react-native"

import IsIos from "../utils/IsIos"

const BackButton = () => {
  const { goBack, canGoBack } = useNavigation()

  return (
    <Pressable onPress={() => canGoBack() && goBack()} style={styles.container}>
      <Ionicons
        name={IsIos ? "ios-chevron-back" : "chevron-back"}
        size={25}
        color={Colors.darkGreen}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.liteGray,
    marginBottom: 25,
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 10,
  },
})

export default BackButton
