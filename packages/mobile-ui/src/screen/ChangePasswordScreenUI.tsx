import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { z } from "zod"

import { BackButton, GradientButton, Input } from "../ui"
import { IsIos } from "../utils"

type Props = {
  changePassword: (data: FormData) => void
}

type FormData = {
  password: string
  confirmPassword: string
}

const ChangePasswordScreenUI = ({ changePassword }: Props) => {
  const schema = z
    .object({
      password: z
        .string()
        .min(6, "Password must contain at least 6 Character(s)"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(schema),
  })

  return (
    <SafeAreaView className="flex-1 px-6 pt-6">
      <ScrollView
        contentContainerStyle={styles.scroll}
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
          style={styles.widthFull}
        />

        <Input
          check
          control={control}
          inputName="confirmPassword"
          placeholder="Confirm Password"
          encrypt
          error={errors.confirmPassword?.message}
          iconName={IsIos ? "ios-lock-closed" : "lock-closed"}
          style={styles.widthFull}
        />

        <View className="absolute bottom-12 self-center">
          <GradientButton text="save" onPress={handleSubmit(changePassword)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  widthFull: { width: "100%" },
})

export default ChangePasswordScreenUI
