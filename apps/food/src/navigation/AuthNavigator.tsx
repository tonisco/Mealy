import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { FailureScreen, SuccessScreen } from "mobile-ui"

import { AuthStack } from "../constants/screen"
import {
  ChangePasswordScreen,
  DetailsFormScreen,
  LocationFormScreen,
  LoginScreen,
  OTPFormScreen,
  ResetPasswordScreen,
  SignUpScreen,
} from "../screens/auth"
import SignUpStore from "../store/SignUpStore"

const Stack = createNativeStackNavigator<AuthStack>()

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
        <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
        <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
        <Stack.Screen name="Details Form" component={DetailsFormScreen} />
        <Stack.Screen name="OTP Form" component={OTPFormScreen} />
        <Stack.Screen name="Location Form" component={LocationFormScreen} />
        <Stack.Screen name="Failure Screen" component={FailureScreen} />
        <Stack.Screen name="Success Screen" component={SuccessScreen} />
      </Stack.Navigator>
    </SignUpStore>
  )
}

export default AuthNavigator
