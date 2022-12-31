/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import { Controller } from "react-hook-form"
import { Platform, StyleSheet, Text, TextInput, View } from "react-native"

import Colors from "../utils/Colors"
import GradientIcon from "./GradientIcon"

type DefaultProps = {
  placeholder: string
  iconName: keyof typeof Ionicons.glyphMap
  encrypt?: boolean
  className?: string
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
    <View className="relative">
      {props?.check ? (
        <>
          <Controller
            name={props.inputName ?? ""}
            control={props.control}
            rules={{ required: true }}
            render={({ field: { value, onBlur, onChange } }) => (
              <TextInput
                className={`mt-1 h-12 w-80 rounded-lg bg-white px-12 font-bento-med ${props.className}`}
                placeholder={props.placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={props.encrypt && hidden}
              />
            )}
          />
          <Text className="my-1 ml-1 font-bento-med text-xs capitalize text-red-500">
            {props.check ? props.error : ""}
          </Text>
        </>
      ) : (
        <TextInput
          className={`my-4 h-12 w-80 rounded-lg bg-white px-12 font-bento-med ${props.className}`}
          placeholder={props.placeholder}
          secureTextEntry={props.encrypt && hidden}
          value={props.value}
          onChangeText={props.changeText}
        />
      )}
      <View className="absolute top-5 left-5">
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
