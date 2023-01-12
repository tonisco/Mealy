import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { trpc } from "@trpcConfig"
import { ChangePasswordScreenUI } from "mobile-ui"
import React from "react"
import { ChangePasswordFormSchema } from "schema"

import LoadingUI from "../../components/LoadingUI"
import { AuthScreenType } from "../../screenTypes"

type Props = NativeStackScreenProps<AuthScreenType, "Change Password">

const ChangePasswordScreen = ({ navigation, route }: Props) => {
  const {
    params: { email },
  } = route

  const { mutate, isLoading } = trpc.food.auth.changePassword.useMutation({
    onSuccess(message) {
      passwordChangeSuccess(message)
    },
    onError(error) {
      passwordChangeFailed({ message: error.message })
    },
  })

  const changePassword = ({ password }: ChangePasswordFormSchema) =>
    mutate({ email, password })

  const passwordChangeSuccess = ({ message }: { message: string }) =>
    navigation.navigate("Success Screen", {
      message,
      nextScreen: "Log In",
      nextScreenParams: { animation: false },
    })

  const passwordChangeFailed = ({ message }: { message: string }) =>
    navigation.navigate("Failure Screen", {
      message,
      nextScreen: "Log In",
    })

  return (
    <>
      {isLoading && <LoadingUI />}
      <ChangePasswordScreenUI changePassword={changePassword} />
    </>
  )
}

export default ChangePasswordScreen
