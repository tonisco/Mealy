import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { DetailsFormScreenUI } from "mobile-ui"
import React from "react"

import { AuthScreenType } from "../../screenTypes"

type Props = NativeStackScreenProps<AuthScreenType, "Details Form">

const DetailsFormScreen = (props: Props) => {
  return <DetailsFormScreenUI {...props} />
}

export default DetailsFormScreen
