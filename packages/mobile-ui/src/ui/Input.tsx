/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import { Controller } from "react-hook-form"
import {
  Platform,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardTypeOptions,
} from "react-native"

import Colors from "../utils/Colors"
import GradientIcon from "./GradientIcon"

type Props = {
  placeholder: string
  iconName: keyof typeof Ionicons.glyphMap
  encrypt?: boolean
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  inputName: string
  error?: string
  keyboardType?: KeyboardTypeOptions
}

const Input = (props: Props) => {
  const [hidden, setHidden] = useState(true)

  return (
    <View className="relative">
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
            testID="controlled input"
            keyboardType={props.keyboardType ?? "default"}
          />
        )}
      />
      <View>
        {/* TODO: ADD A DEFAULT HEIGHT TO VIEW */}
        {props.error && (
          <Text
            className="font-bento-med text-xs capitalize text-red-500"
            testID="errorMessage"
            accessibilityLabel={props.inputName}
          >
            {props.error}
          </Text>
        )}
      </View>
      <View className="absolute top-[16px] left-5">
        <GradientIcon name={props.iconName} />
      </View>
      {props.encrypt &&
        (hidden ? (
          <Pressable
            className="top[18px] absolute right-5"
            testID="eye-off"
            onPress={() => setHidden(!hidden)}
          >
            <Ionicons
              size={20}
              name={Platform.OS === "ios" ? "ios-eye-off" : "eye-off"}
              color={Colors.liteGray}
            />
          </Pressable>
        ) : (
          <Pressable
            className="top[18px] absolute right-5"
            testID="eye"
            onPress={() => setHidden(!hidden)}
          >
            <Ionicons
              size={20}
              name={Platform.OS === "ios" ? "ios-eye" : "eye"}
              color={Colors.liteGray}
            />
          </Pressable>
        ))}
    </View>
  )
}

export default Input
