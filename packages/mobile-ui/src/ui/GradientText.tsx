/* eslint-disable @typescript-eslint/restrict-template-expressions */
import MaskedView from "@react-native-masked-view/masked-view"
import React from "react"
import { Text } from "react-native"

import GradientBackground from "./GradientBackground"

type Props = {
  text?: string
  colors?: string[]
  className?: string
}

const GradientText = ({ text, colors, className }: Props) => {
  return (
    <MaskedView
      maskElement={
        <Text
          className={`bg-transparent text-center font-bento-bold ${className}`}
        >
          {text}
        </Text>
      }
    >
      <GradientBackground colors={colors}>
        <Text className={`text-center font-bento-bold opacity-0 ${className}`}>
          {text}
        </Text>
      </GradientBackground>
    </MaskedView>
  )
}

export default GradientText
