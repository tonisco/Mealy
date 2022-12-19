import MaskedView from "@react-native-masked-view/masked-view"
import React from "react"
import { Text, StyleSheet, TextStyle } from "react-native"

import GradientBackground from "./GradientBackground"

type Props = {
  text?: string
  style?: TextStyle
  colors?: string[]
}

const GradientText = ({ text, style, colors }: Props) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[styles.main, styles.rmBackground, style]}>{text}</Text>
      }
    >
      <GradientBackground colors={colors}>
        <Text style={[styles.main, styles.opacity, style]}>{text}</Text>
      </GradientBackground>
    </MaskedView>
  )
}

const styles = StyleSheet.create({
  main: {
    textAlign: "center",
    fontFamily: "font-bold",
  },
  rmBackground: {
    backgroundColor: "transparent",
  },
  opacity: {
    opacity: 0,
  },
})

export default GradientText
