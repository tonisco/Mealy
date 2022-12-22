import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as React from "react"

import { SignUpScreen } from "../screens/auth"
import { AuthStack } from "../screens/types"

const Stack = createNativeStackNavigator<AuthStack>()

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
