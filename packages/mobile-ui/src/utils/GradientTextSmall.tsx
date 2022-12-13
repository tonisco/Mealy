import MaskedView from "@react-native-masked-view/masked-view"
import TextSize from "mobile-constants/src/TextSize"
import React from "react"
import { Text, StyleSheet } from "react-native"

import GradientBackground from "./GradientBackground"

const GradientTextSmall = ({ text }: { text?: string }) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[styles.main, styles.rmBackground]}>{text}</Text>
      }
    >
      <GradientBackground>
        <Text style={[styles.main, styles.opacity]}>{text}</Text>
      </GradientBackground>
    </MaskedView>
  )
}

const styles = StyleSheet.create({
  main: {
    fontSize: TextSize.tiny,
    textAlign: "center",
    textTransform: "capitalize",
    fontFamily: "font-bold",
  },
  rmBackground: {
    backgroundColor: "transparent",
  },
  opacity: {
    opacity: 0,
  },
})

export default GradientTextSmall
