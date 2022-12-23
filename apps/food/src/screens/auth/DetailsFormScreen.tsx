import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { DetailsFormScreenUI } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import React from "react"

type Props = NativeStackScreenProps<AuthScreenType, "Details Form">

const DetailsFormScreen = (props: Props) => {
  return <DetailsFormScreenUI {...props} />
}

export default DetailsFormScreen
