import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ResetPasswordScreenUI } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React from "react"
import { Alert } from "react-native"
import { ResetPasswordSchema } from "schema"
import { trpc } from "trpc-client"

import LoadingUI from "../../components/LoadingUI"

type Props = NativeStackScreenProps<AuthScreenType, "Reset Password">

const ResetPasswordScreen = ({ navigation }: Props) => {
  const { mutate, isLoading } = trpc.food.auth.sendOTP.useMutation({
    onError(error) {
      Alert.alert("OTP ERROR", error.message)
    },
    onSuccess(_, variable) {
      navigation.navigate("OTP Form", { email: variable.email })
    },
  })

  const requestOTP = ({ email }: ResetPasswordSchema) => mutate({ email })

  return (
    <>
      {isLoading && <LoadingUI />}
      <ResetPasswordScreenUI requestOTP={requestOTP} />
    </>
  )
}

export default ResetPasswordScreen
