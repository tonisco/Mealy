import { Ionicons } from "@expo/vector-icons"
import Colors from "mobile-constants/src/Colors"
import TextSize from "mobile-constants/src/TextSize"
import React, { useState } from "react"
import { Controller } from "react-hook-form"
import { StyleSheet, Text, TextInput, View, ViewStyle } from "react-native"

import GradientIcon from "../utils/GradientIcon"

type Props = {
  style?: ViewStyle
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  iconName: keyof typeof Ionicons.glyphMap
  inputName: string
  placeholder: string
  error?: string
  encrypt?: boolean
}

const Input = ({
  iconName,
  inputName,
  control,
  placeholder,
  error,
  encrypt,
}: Props) => {
  const [hidden, setHidden] = useState(true)

  return (
    <View style={styles.inputContainer}>
      <Controller
        name={inputName}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onBlur, onChange } }) => (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={encrypt && hidden}
          />
        )}
      />
      <Text style={styles.errorMessage}>{error}</Text>
      <View style={[styles.icon, styles.iconLeft]}>
        <GradientIcon name={iconName} />
      </View>
      {encrypt &&
        (hidden ? (
          <Ionicons
            style={[styles.icon, styles.iconRight]}
            size={20}
            name="eye-off"
            onPress={() => setHidden(!hidden)}
          />
        ) : (
          <Ionicons
            style={[styles.icon, styles.iconRight]}
            size={20}
            name="eye"
            onPress={() => setHidden(!hidden)}
          />
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
  },
  input: {
    height: 50,
    width: 300,
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 50,
    fontFamily: "font-medium",
    backgroundColor: "#fff",
  },
  errorMessage: {
    fontFamily: "font-medium",
    fontSize: TextSize.tiny,
    textTransform: "capitalize",
    color: "red",
    marginLeft: 5,
    marginTop: 2,
    marginBottom: 5,
  },
  icon: {
    position: "absolute",
    top: 20,
  },
  iconLeft: {
    left: 20,
  },
  iconRight: {
    right: 20,
    color: Colors.liteGray,
  },
})

export default Input
