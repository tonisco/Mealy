import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { trpc } from "@trpcConfig"
import { SignUpScreenUI, UseSignUpState } from "mobile-ui"
import React from "react"
import { Alert, Keyboard } from "react-native"
import { SignUpFormSchema } from "schema"

import LoadingUI from "../../components/LoadingUI"
import { AuthScreenType } from "../../screenTypes"

type Props = NativeStackScreenProps<AuthScreenType, "Sign Up">

const SignUpScreen = (props: Props) => {
  const {
    navigation: { navigate },
  } = props
  const { setSignUpState, signUpState } = UseSignUpState()

  const { mutate, isLoading } = trpc.food.auth.emailExist.useMutation({
    onSuccess(data) {
      saveData(data.emailUsed)
    },
    onError(error) {
      Alert.alert("Sign Up Error", error.message)
    },
  })

  const createAccount = (data: SignUpFormSchema) => {
    Keyboard.dismiss()
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
    <>
      {isLoading && <LoadingUI />}
      <SignUpScreenUI
        {...props}
        logoText="Mealy Food"
        logoImageSource={require("../../../assets/images/Asset2.png")}
        googleImageSource={require("../../../assets/images/google.png")}
        createAccount={createAccount}
      />
    </>
  )
}

export default SignUpScreen
