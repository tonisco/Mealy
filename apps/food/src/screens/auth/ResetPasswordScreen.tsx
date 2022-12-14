import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { trpc } from "@trpcConfig"
import { ResetPasswordScreenUI } from "mobile-ui"
import React from "react"
import { Alert } from "react-native"
import { ResetPasswordFormSchema } from "schema"

import LoadingUI from "../../components/LoadingUI"
import { AuthScreenType } from "../../screenTypes"

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

  const requestOTP = ({ email }: ResetPasswordFormSchema) => mutate({ email })

  return (
    <>
      {isLoading && <LoadingUI />}
      <ResetPasswordScreenUI requestOTP={requestOTP} />
    </>
  )
}

export default ResetPasswordScreen
