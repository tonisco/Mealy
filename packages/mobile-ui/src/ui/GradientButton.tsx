import React from "react"
import { StyleSheet } from "react-native"

import GradientBackground from "../utils/GradientBackground"

const GradientButton = ({ children }: { children: React.ReactElement }) => {
  return (
    <GradientBackground style={styles.button}>{children}</GradientBackground>
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
