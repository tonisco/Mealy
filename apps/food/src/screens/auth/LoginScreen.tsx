import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { LoginScreenUI } from "mobile-ui"
import { UseUserState } from "mobile-ui/src/context/UserStore"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React, { useState } from "react"
import { Alert } from "react-native"
import { trpc } from "trpc-client"

type Props = NativeStackScreenProps<AuthScreenType, "Log In">

const LoginScreen = (props: Props) => {
  const [email, changeEmail] = useState("")
  const [password, changePassword] = useState("")

  const { saveUser } = UseUserState()

  const { mutate } = trpc.food.auth.login.useMutation({
    onSuccess(data) {
      saveUser(data).catch(() => Alert.alert("Login Error"))
    },
    onError(error) {
      Alert.alert("Login Error", error.message)
    },
  })

  const loginAccount = () => {
    mutate({ email, password })
  }
  return (
    <LoginScreenUI
      {...props}
      email={email}
      changeEmail={changeEmail}
      logoText="Mealy Food"
      password={password}
      changePassword={changePassword}
      loginAccount={loginAccount}
      logoImageSource={require("../../../assets/images/Asset2.png")}
      googleImageSource={require("../../../assets/images/google.png")}
    />
  )
}

export default LoginScreen
