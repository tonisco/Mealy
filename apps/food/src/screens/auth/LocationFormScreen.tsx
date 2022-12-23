import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { LocationFormScreenUI, UseSignUpState } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React, { useRef } from "react"

type Props = NativeStackScreenProps<AuthScreenType, "Location Form">

type FormData = {
  street: string
  city: string
  country: string
}

type Ref = {
  clear: () => void
}

const LocationFormScreen = ({ navigation }: Props) => {
  const { clearState, signUpState } = UseSignUpState()

  const ref = useRef<Ref>(null)

  const createProfile = (data: FormData) => {
    console.log(data)
    console.log(signUpState)
    // clear state
    clearState()
    console.log("Leaving Reset Password")
    ref.current?.clear()
    navigation.navigate("Success Screen", {
      message: "Your account has successfully been created",
      nextScreen: "Log In",
    })
  }

  return <LocationFormScreenUI createProfile={createProfile} />
}

export default LocationFormScreen
