import { createNativeStackNavigator } from "@react-navigation/native-stack"

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
      <Stack.Screen name="Log In" component={LoginScreen} />
      <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
      <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
      <Stack.Screen name="Details Form" component={DetailsFormScreen} />
      <Stack.Screen name="OTP Form" component={OTPFormScreen} />
      <Stack.Screen name="Location Form" component={LocationFormScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
