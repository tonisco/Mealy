import { LinearGradient, LinearGradientPoint } from "expo-linear-gradient"
import React from "react"
import { StyleProp, ViewStyle } from "react-native"

type Props = {
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
  start?: LinearGradientPoint
  end?: LinearGradientPoint
  locations?: number[]
}

const GradientBackground = ({
  children,
  style,
  start,
  end,
  locations,
}: Props) => {
  return (
    <LinearGradient
      style={style}
      colors={["#53E88B", "#15BE77"]}
      start={start ?? { x: 0, y: -0.24 }}
      end={end ?? { x: 1, y: 0.24 }}
      locations={locations ?? [0.33, 0.67]}
    >
      {children}
    </LinearGradient>
  )
}

export default GradientBackground
