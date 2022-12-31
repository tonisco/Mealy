import React, { forwardRef } from "react"
import { TextInput } from "react-native"

type Props = {
  value: string
  onChangeText: (v: string) => void
}

const SquareInput = forwardRef<TextInput, Props>(
  ({ onChangeText, value }, ref) => {
    return (
      <TextInput
        keyboardType="numeric"
        maxLength={1}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="next"
        className="mr-4 h-16 w-16 rounded-lg bg-white px-3 text-center font-bento-med text-xl"
        ref={ref}
      />
    )
  },
)

export default SquareInput
