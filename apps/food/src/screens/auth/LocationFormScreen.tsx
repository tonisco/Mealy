import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { LocationFormScreenUI, UseSignUpState, UseUserState } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React from "react"
import { Alert } from "react-native"
import { LocationFormSchema } from "schema"
import { trpc } from "trpc-client"

import LoadingUI from "../../components/LoadingUI"

type Props = NativeStackScreenProps<AuthScreenType, "Location Form">

const LocationFormScreen = ({ navigation }: Props) => {
  const {
    clearState,
    signUpState: { email, firstName, lastName, password, phone },
  } = UseSignUpState()

  const { saveUser } = UseUserState()

  const { mutate, isLoading } = trpc.food.auth.signUp.useMutation({
    onError(error) {
      failedCreateProfile({ message: error.message })
    },
    onSuccess(data) {
      saveUser(data)
        .then(() => successCreateProfile())
        .catch(() => Alert.alert("Sign Up Error"))
    },
  })

  const createProfile = ({
    city,
    country,
    state,
    street,
  }: LocationFormSchema) =>
    mutate({
      city,
      country,
      email,
      phone,
      state,
      street,
      password,
      fullName: `${firstName} ${lastName}`,
    })

  const successCreateProfile = () => {
    // clear state
    clearState()
    navigation.navigate("Success Screen", {
      message: "Your account has successfully been created",
      nextScreen: "Log In",
      nextScreenParams: { animation: false },
    })
  }

  const failedCreateProfile = ({ message }: { message: string }) =>
    Alert.alert("Failed to create password", message)

  return (
    <>
      {isLoading && <LoadingUI />}
      <LocationFormScreenUI createProfile={createProfile} />
    </>
  )
}

export default LocationFormScreen
