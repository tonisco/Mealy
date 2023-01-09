import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { resetPasswordFormSchema, ResetPasswordFormSchema } from "schema"

import { BackButton, GradientButton, Input } from "../ui"
import { IsIos } from "../utils"

type Props = {
  requestOTP: ({ email }: ResetPasswordFormSchema) => void
}

const ResetPasswordScreenUI = ({ requestOTP }: Props) => {
  const resolver = zodResolver(resetPasswordFormSchema)

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver, defaultValues: { email: "" } })

  return (
    <SafeAreaView className="-z-50 flex-1 px-6 pt-6">
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton />
        <View className="mb-4 items-start">
          <Text className="mb-1 text-left font-bento-bold text-3xl uppercase text-dark">
            Reset Password
          </Text>
          <Text className="mt-1 text-left font-bento-reg text-xs leading-4 text-dark">
            Please enter your email to receive a 4 digit code to reset your
            password
          </Text>
        </View>
        <Input
          placeholder="Email"
          iconName={IsIos ? "ios-mail" : "mail"}
          control={control}
          inputName="email"
          error={errors.email?.message}
          className="w-full"
        />

        <View className="absolute bottom-12 self-center">
          <GradientButton text="send" onPress={handleSubmit(requestOTP)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
})

export default ResetPasswordScreenUI
