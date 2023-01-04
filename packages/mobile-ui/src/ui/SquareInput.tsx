import React from "react"
import { Control, Controller } from "react-hook-form"
import { TextInput } from "react-native"

type Props = {
  name: "pin1" | "pin2" | "pin3" | "pin4"
  control: Control<
    {
      pin1: string
      pin2: string
      pin3: string
      pin4: string
    },
    unknown
  >
  changeFocus: () => void
}

const SquareInput = ({ name, control, changeFocus }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onBlur, onChange, value, ref } }) => (
        <TextInput
          keyboardType="numeric"
          maxLength={1}
          value={value}
          onBlur={onBlur}
          onChangeText={(e) => {
            onChange(e)
            e && changeFocus()
          }}
          ref={ref}
          className="mr-4 h-16 w-16 rounded-lg bg-white px-3 text-center font-bento-med text-xl"
          testID="squareInput"
        />
      )}
    />
  )
}

export default SquareInput
