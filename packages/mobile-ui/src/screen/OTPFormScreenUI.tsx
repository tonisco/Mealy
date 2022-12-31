import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { View, Text, Keyboard, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { otpFormSchema, OtpFormSchema } from "schema"

import { BackButton, GradientButton, SquareInput } from "../ui"

type Props = {
  sendPin: (data: OtpFormSchema) => void
}

const OTPFormScreenUI = ({ sendPin }: Props) => {
  const resolver = zodResolver(otpFormSchema)

  const { control, handleSubmit, setFocus } = useForm({
    resolver,
    defaultValues: { pin1: "", pin2: "", pin3: "", pin4: "" },
  })

  const pinChange1 = () => setFocus("pin2")
  const pinChange2 = () => setFocus("pin3")
  const pinChange3 = () => setFocus("pin4")
  const pinChange4 = () => Keyboard.dismiss()

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
          <SquareInput changeFocus={pinChange1} control={control} name="pin1" />
          <SquareInput changeFocus={pinChange2} control={control} name="pin2" />
          <SquareInput changeFocus={pinChange3} control={control} name="pin3" />
          <SquareInput changeFocus={pinChange4} control={control} name="pin4" />
        </View>
        <View className="absolute bottom-12 self-center">
          <GradientButton text="next" onPress={handleSubmit(sendPin)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default OTPFormScreenUI
