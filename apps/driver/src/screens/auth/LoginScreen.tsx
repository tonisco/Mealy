import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { LoginScreenUI, UseUserState } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React from "react"
import { Alert } from "react-native"
import { LoginFormSchema } from "schema"
import { trpc } from "trpc-client"

import LoadingUI from "../../components/LoadingUI"

type Props = NativeStackScreenProps<AuthScreenType, "Log In">

const LoginScreen = (props: Props) => {
  const { saveUser } = UseUserState()

  const { mutate, isLoading } = trpc.courier.auth.login.useMutation({
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
        logoText="Mealy Driver"
        loginAccount={loginAccount}
        logoImageSource={require("../../../assets/images/Asset1.png")}
        googleImageSource={require("../../../assets/images/google.png")}
      />
    </>
  )
}

export default LoginScreen
