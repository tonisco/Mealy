import React, { forwardRef } from "react"
import { StyleSheet, TextInput } from "react-native"

import TextSize from "../utils/TextSize"

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
        style={styles.input}
        ref={ref}
      />
    )
  },
)

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    marginRight: 20,
    height: 60,
    width: 60,
    fontFamily: "font-medium",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: TextSize.medium,
    textAlign: "center",
  },
})

export default SquareInput
