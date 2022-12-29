import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ResetPasswordScreenUI } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React, { useState } from "react"
import { Alert } from "react-native"
import { trpc } from "trpc-client"

type Props = NativeStackScreenProps<AuthScreenType, "Reset Password">

const ResetPasswordScreen = ({ navigation }: Props) => {
  const [email, changeEmail] = useState("")

  const { mutate } = trpc.courier.auth.sendOtp.useMutation({
    onSuccess() {
      navigation.navigate("OTP Form", { email })
    },
    onError(error) {
      Alert.alert("OTP ERROR", error.message)
    },
  })

  const requestOtp = () => mutate({ email })

  return (
    <ResetPasswordScreenUI
      requestOTP={requestOtp}
      email={email}
      changeEmail={changeEmail}
    />
  )
}

export default ResetPasswordScreen
