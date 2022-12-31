import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SignUpScreenUI, UseSignUpState } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React from "react"
import { Alert } from "react-native"
import { SignUpFormSchema } from "schema"
import { trpc } from "trpc-client"

import LoadingUI from "../../components/LoadingUI"

type Props = NativeStackScreenProps<AuthScreenType, "Sign Up">

const SignUpScreen = (props: Props) => {
  const {
    navigation: { navigate },
  } = props

  const { setSignUpState, signUpState } = UseSignUpState()

  const { mutate, isLoading } = trpc.courier.auth.emailExist.useMutation({
    onSuccess(data) {
      saveData(data.emailUsed)
    },
    onError(error) {
      Alert.alert("Sign Up Error", error.message)
    },
  })

  const createAccount = (data: SignUpFormSchema) => {
    const { email } = data
    setSignUpState({ ...signUpState, ...data })
    mutate({ email })
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
        logoText="Mealy Driver"
        logoImageSource={require("../../../assets/images/Asset1.png")}
        googleImageSource={require("../../../assets/images/google.png")}
        createAccount={createAccount}
      />
    </>
  )
}

export default SignUpScreen
