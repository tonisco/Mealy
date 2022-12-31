import React, { Dispatch, useRef } from "react"
import { View, Text, TextInput, Keyboard, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { BackButton, GradientButton, SquareInput } from "../ui"

type Props = {
  pin1: string
  changePin1: Dispatch<React.SetStateAction<string>>
  pin2: string
  changePin2: Dispatch<React.SetStateAction<string>>
  pin3: string
  changePin3: Dispatch<React.SetStateAction<string>>
  pin4: string
  changePin4: Dispatch<React.SetStateAction<string>>
  sendPin: () => void
}

const OTPFormScreenUI = ({
  sendPin,
  pin1,
  changePin1,
  changePin2,
  changePin3,
  changePin4,
  pin2,
  pin3,
  pin4,
}: Props) => {
  const pin1Ref = useRef<TextInput>(null)
  const pin2Ref = useRef<TextInput>(null)
  const pin3Ref = useRef<TextInput>(null)
  const pin4Ref = useRef<TextInput>(null)

  // TODO: use hook form

  const pinChange1 = (v: string) => {
    changePin1(v)
    if (v) pin2Ref.current?.focus()
  }
  const pinChange2 = (v: string) => {
    changePin2(v)
    if (v) pin3Ref.current?.focus()
  }
  const pinChange3 = (v: string) => {
    changePin3(v)
    if (v) pin4Ref.current?.focus()
  }
  const pinChange4 = (v: string) => {
    changePin4(v)
    if (v) Keyboard.dismiss()
  }

  return (
    <SafeAreaView className="flex-1 px-6 pt-6">
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton />

        <View className="mb-4 items-start">
          <Text className="mb-1 font-bento-bold text-3xl uppercase text-dark">
            We have sent an OTP to your Email
          </Text>
          <Text className="mt-1 font-bento-reg text-xs leading-4 text-dark">
            Please check your Email for your otp, to continue to reset your
            password
          </Text>
        </View>

        <View className="flex-row">
          <SquareInput value={pin1} onChangeText={pinChange1} ref={pin1Ref} />
          <SquareInput value={pin2} onChangeText={pinChange2} ref={pin2Ref} />
          <SquareInput value={pin3} onChangeText={pinChange3} ref={pin3Ref} />
          <SquareInput value={pin4} onChangeText={pinChange4} ref={pin4Ref} />
        </View>

        <View className="absolute bottom-12 self-center">
          <GradientButton text="next" onPress={sendPin} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default OTPFormScreenUI
