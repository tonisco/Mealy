/* eslint-disable @typescript-eslint/restrict-template-expressions */
import MaskedView from "@react-native-masked-view/masked-view"
import React from "react"
import { Text } from "react-native"

import GradientBackground from "./GradientBackground"

type Props = {
  text?: string
  colors?: string[]
  className?: string
  style?: string
}

const GradientText = ({ text, colors, className, style }: Props) => {
  return (
    <MaskedView
      maskElement={
        <Text
          className={`bg-transparent text-center font-bento-bold ${className} ${style}`}
        >
          {text}
        </Text>
      }
    >
      <GradientBackground colors={colors}>
        <Text
          className={`text-center font-bento-bold opacity-0 ${className} ${style}`}
        >
          {text}
        </Text>
      </GradientBackground>
    </MaskedView>
  )
}

export default GradientText
