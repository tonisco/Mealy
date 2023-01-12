import { UseUserState } from "@context"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { trpc } from "@trpcConfig"
import { LoginScreenUI } from "mobile-ui"
import React from "react"
import { Alert } from "react-native"
import { LoginFormSchema } from "schema"

import LoadingUI from "../../components/LoadingUI"
import { AuthScreenType } from "../../screenTypes"

type Props = NativeStackScreenProps<AuthScreenType, "Log In">

const LoginScreen = (props: Props) => {
  const { saveUser } = UseUserState()

  const { mutate, isLoading } = trpc.food.auth.login.useMutation({
    onSuccess(data) {
      saveUser(data).catch(() => Alert.alert("Login Error"))
    },
    onError(error) {
      Alert.alert("Login Error", error.message)
    },
  })

  const loginAccount = ({ email, password }: LoginFormSchema) =>
    mutate({ email, password })

  return (
    <>
      {isLoading && <LoadingUI />}
      <LoginScreenUI
        {...props}
        logoText="Mealy Food"
        loginAccount={loginAccount}
        logoImageSource={require("../../../assets/images/Asset2.png")}
        googleImageSource={require("../../../assets/images/google.png")}
      />
    </>
  )
}

export default LoginScreen
