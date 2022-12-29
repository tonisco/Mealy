import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ResetPasswordScreenUI } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React, { useState } from "react"
import { Alert } from "react-native"
import { trpc } from "trpc-client"

import LoadingUI from "../../components/LoadingUI"

type Props = NativeStackScreenProps<AuthScreenType, "Reset Password">

const ResetPasswordScreen = ({ navigation }: Props) => {
  const [email, changeEmail] = useState("")

  const { mutate, isLoading } = trpc.food.auth.sendOTP.useMutation({
    onError(error) {
      Alert.alert("OTP ERROR", error.message)
    },
    onSuccess() {
      navigation.navigate("OTP Form", { email })
    },
  })

  const requestOTP = () => mutate({ email })

  return (
    <>
      {isLoading && <LoadingUI />}
      <ResetPasswordScreenUI
        changeEmail={changeEmail}
        email={email}
        requestOTP={requestOTP}
      />
    </>
  )
}

export default ResetPasswordScreen
