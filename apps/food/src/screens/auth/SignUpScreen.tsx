import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SignUpScreenUI, UseSignUpState } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React from "react"
import { Alert } from "react-native"
import { trpc } from "trpc-client"

type Props = NativeStackScreenProps<AuthScreenType, "Sign Up">

type FormData = {
  email: string
  password: string
  confirmPassword: string
}

const SignUpScreen = (props: Props) => {
  const {
    navigation: { navigate },
  } = props
  const { setSignUpState, signUpState } = UseSignUpState()

  const { mutate } = trpc.food.auth.emailExist.useMutation({
    onSuccess(data) {
      saveData(data.emailUsed)
    },
    onError(error) {
      console.error(error)
    },
  })

  const createAccount = (data: FormData) => {
    setSignUpState({ ...signUpState, ...data })
    mutate({ email: data.email })
  }

  const saveData = (isUsed: boolean) => {
    if (isUsed) {
      Alert.alert(
        "Email already used",
        "Email has already been used in this application. you can either login or provide a new email",
      )
      return
    }
    navigate("Details Form")
  }

  return (
    <SignUpScreenUI
      {...props}
      logoText="Mealy Food"
      logoImageSource={require("../../../assets/images/Asset2.png")}
      googleImageSource={require("../../../assets/images/google.png")}
      createAccount={createAccount}
    />
  )
}

export default SignUpScreen
