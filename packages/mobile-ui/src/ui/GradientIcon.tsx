import { Ionicons } from "@expo/vector-icons"
import MaskedView from "@react-native-masked-view/masked-view"
import React from "react"
import { StyleSheet, TextStyle } from "react-native"

import GradientBackground from "./GradientBackground"

type Props = {
  iconStyle?: TextStyle
  name: keyof typeof Ionicons.glyphMap
  size?: number
}

const GradientIcon = ({ iconStyle, name, size }: Props) => {
  return (
    <MaskedView
      maskElement={
        <Ionicons
          name={name}
          size={size ?? 20}
          style={[iconStyle, styles.rmBackground]}
        />
      }
    >
      <GradientBackground
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ opacity: 0.7 }}
      >
        <Ionicons
          name={name}
          size={size ?? 20}
          style={[iconStyle, styles.opacity]}
        />
      </GradientBackground>
    </MaskedView>
  )
}

const styles = StyleSheet.create({
  rmBackground: {
    backgroundColor: "transparent",
  },
  opacity: {
    opacity: 0,
  },
})

export default GradientIcon
