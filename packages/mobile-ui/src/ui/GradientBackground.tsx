import { LinearGradient, LinearGradientPoint } from "expo-linear-gradient"
import React from "react"
import { StyleProp, ViewStyle } from "react-native"

import Colors from "../utils/Colors"

type Props = {
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
  start?: LinearGradientPoint
  end?: LinearGradientPoint
  locations?: number[]
  colors?: string[]
  testID?: string
}

const GradientBackground = ({
  children,
  style,
  start,
  end,
  locations,
  colors,
  testID,
}: Props) => {
  return (
    <LinearGradient
      style={style}
      colors={colors ?? [Colors.liteGreen, Colors.darkGreen]}
      start={start ?? { x: 0, y: -0.24 }}
      end={end ?? { x: 1, y: 0.24 }}
      locations={locations ?? [0.33, 0.67]}
      testID={testID}
    >
      {children}
    </LinearGradient>
  )
}

export default GradientBackground
