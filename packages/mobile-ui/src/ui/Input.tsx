import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import { Controller } from "react-hook-form"
import { Platform, StyleSheet, Text, TextInput, View } from "react-native"

import Colors from "../utils/Colors"
import TextSize from "../utils/TextSize"
import GradientIcon from "./GradientIcon"

type DefaultProps = {
  placeholder: string
  iconName: keyof typeof Ionicons.glyphMap
  encrypt?: boolean
}

type SecureProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  inputName: string
  error?: string
  check: true
}

type UnsecureProps = {
  value: string
  check: false
  changeText: React.Dispatch<React.SetStateAction<string>>
}

type Secure = DefaultProps & SecureProps
type Unsecure = DefaultProps & UnsecureProps

type Props = Secure | Unsecure

const Input = (props: Props) => {
  const [hidden, setHidden] = useState(true)

  return (
    <View style={styles.inputContainer}>
      {props?.check ? (
        <>
          <Controller
            name={props.inputName ?? ""}
            control={props.control}
            rules={{ required: true }}
            render={({ field: { value, onBlur, onChange } }) => (
              <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={props.encrypt && hidden}
              />
            )}
          />

          <Text style={styles.errorMessage}>
            {props.check ? props.error : ""}
          </Text>
        </>
      ) : (
        <TextInput
          style={[styles.input, styles.unsecureInput]}
          placeholder={props.placeholder}
          secureTextEntry={props.encrypt && hidden}
          value={props.value}
          onChangeText={props.changeText}
        />
      )}
      <View style={[styles.icon, styles.iconLeft]}>
        <GradientIcon name={props.iconName} />
      </View>
      {props.encrypt &&
        (hidden ? (
          <Ionicons
            style={[styles.icon, styles.iconRight]}
            size={20}
            name={Platform.OS === "ios" ? "ios-eye-off" : "eye-off"}
            onPress={() => setHidden(!hidden)}
          />
        ) : (
          <Ionicons
            style={[styles.icon, styles.iconRight]}
            size={20}
            name={Platform.OS === "ios" ? "ios-eye" : "eye"}
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
  unsecureInput: {
    marginVertical: 15,
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
    top: 18,
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
