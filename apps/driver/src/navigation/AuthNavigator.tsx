import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { FailureScreen, SignUpStore, SuccessScreen } from "mobile-ui"
import { AuthScreenType } from "mobile-ui/src/screenTypes/default"
import * as React from "react"

import {
  ChangePasswordScreen,
  DetailsFormScreen,
  LocationFormScreen,
  LoginScreen,
  OTPFormScreen,
  ResetPasswordScreen,
  SignUpScreen,
} from "../screens/auth"

const Stack = createNativeStackNavigator<AuthScreenType>()

const AuthNavigator = () => {
  return (
    <SignUpStore>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Log In" component={LoginScreen} />
        <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
        <Stack.Screen name="Details Form" component={DetailsFormScreen} />
        <Stack.Screen name="Location Form" component={LocationFormScreen} />
        <Stack.Screen name="OTP Form" component={OTPFormScreen} />
        <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
        <Stack.Screen name="Success Screen" component={SuccessScreen} />
        <Stack.Screen name="Failure Screen" component={FailureScreen} />
      </Stack.Navigator>
    </SignUpStore>
  )
}

export default AuthNavigator
