import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { View, Text, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ChangePasswordFormSchema, changePasswordFormSchema } from "schema"

import { BackButton, GradientButton, Input } from "../ui"
import { IsIos } from "../utils"

type Props = {
  changePassword: (data: ChangePasswordFormSchema) => void
}

const ChangePasswordScreenUI = ({ changePassword }: Props) => {
  const resolver = zodResolver(changePasswordFormSchema)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { password: "", confirmPassword: "" },
    resolver,
  })

  return (
    <SafeAreaView className="flex-1 px-6 pt-6">
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton />

        <View className="mb-4 items-start">
          <Text className="mb-1 text-left font-bento-bold text-3xl uppercase text-dark">
            New Password
          </Text>
          <Text className="mt-1 text-left font-bento-reg text-xs leading-3 text-dark">
            Please enter your new password
          </Text>
        </View>

        <Input
          check
          control={control}
          inputName="password"
          placeholder="Password"
          error={errors.password?.message}
          encrypt
          iconName={IsIos ? "ios-lock-closed" : "lock-closed"}
          className="w-full"
        />

        <Input
          check
          control={control}
          inputName="confirmPassword"
          placeholder="Confirm Password"
          encrypt
          error={errors.confirmPassword?.message}
          iconName={IsIos ? "ios-lock-closed" : "lock-closed"}
          className="w-full"
        />

        <View className="absolute bottom-12 self-center">
          <GradientButton text="save" onPress={handleSubmit(changePassword)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChangePasswordScreenUI
