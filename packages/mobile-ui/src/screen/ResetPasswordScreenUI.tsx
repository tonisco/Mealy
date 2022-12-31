import React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { BackButton, GradientButton, Input } from "../ui"
import { IsIos } from "../utils"

type Props = {
  requestOTP: () => void
  email: string
  changeEmail: React.Dispatch<React.SetStateAction<string>>
}

const ResetPasswordScreenUI = ({ requestOTP, changeEmail, email }: Props) => {
  return (
    <SafeAreaView className="flex-1 px-6 pt-6">
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
          check={false}
          value={email}
          changeText={changeEmail}
          style={styles.widthFull}
        />

        <View className="absolute bottom-12 self-center">
          <GradientButton text="send" onPress={requestOTP} />
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

export default ResetPasswordScreenUI
