import React from "react"
import { Pressable, StyleSheet, Text } from "react-native"

import GradientBackground from "./GradientBackground"

type Props = {
  text: string
  onPress: () => void
}

const GradientButton = ({ text, onPress }: Props) => {
  return (
    <GradientBackground style={styles.button}>
      <Pressable onPress={onPress}>
        <Text className="font-bento-bold capitalize text-white">{text}</Text>
      </Pressable>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: "black",
    shadowOffset: { height: 4, width: 3 },
    elevation: 4,
    shadowOpacity: 0.9,
    shadowRadius: 4,
    minWidth: 120,
    alignItems: "center",
  },
})

export default GradientButton
