import { zodResolver } from "@hookform/resolvers/zod"
import Colors from "mobile-constants/src/Colors"
import TextSize from "mobile-constants/src/TextSize"
import { GradientButton, GradientIcon, GradientText } from "mobile-ui"
import React from "react"
import { useForm, Controller } from "react-hook-form"
import { View, Text, StyleSheet, Image, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as z from "zod"

type FormData = {
  email: string
  password: string
  confirmPassword: string
}

const SignUpScreen = () => {
  const schema = z
    .object({
      email: z
        .string()
        .email()
        .trim()
        .refine((val) => val.toLocaleLowerCase()),
      password: z.string().min(6),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "", confirmPassword: "" },
    resolver: zodResolver(schema),
  })

  const createAccount = (data: FormData) => {
    console.log("yes")
    console.log(data)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require("../../../assets/images/Asset2.png")}
        />
        <GradientText style={styles.logoText} text="Mealy Food" />
      </View>
      <View style={styles.details}>
        <Text style={styles.heading}>Sign up for Free</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onBlur, onChange } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Text>{errors.email?.message}</Text>
            <View style={styles.icon}>
              <GradientIcon name="mail" />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Controller
              name="password"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <View style={styles.icon}>
              <GradientIcon name="lock-closed" />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <View style={styles.icon}>
              <GradientIcon name="lock-closed" />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <GradientButton
            text="Create Account"
            onPress={handleSubmit(createAccount)}
          />
        </View>

        <View style={styles.other}>
          <Text style={styles.continueText}>Or Continue With</Text>
          <View style={styles.googleContainer}>
            <Image
              source={require("../../../assets/images/google.png")}
              style={styles.googleImage}
            />
            <Text style={styles.googleText}>Google</Text>
          </View>
          <View style={styles.optionsContainer}>
            <GradientText
              style={styles.accountText}
              text="Already have an account? Login"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoImage: {
    width: 200,
    height: 84,
    marginBottom: 10,
  },
  logoText: {
    fontSize: TextSize.large,
    textTransform: "uppercase",
  },
  details: {
    marginTop: 15,
    alignItems: "center",
  },
  heading: {
    fontFamily: "font-bold",
    fontSize: TextSize.medium,
    textTransform: "uppercase",
    marginVertical: 5,
    color: Colors.dark,
  },
  form: {
    marginVertical: 20,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    height: 50,
    width: 300,
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 50,
    paddingRight: 20,
    fontFamily: "font-medium",
    backgroundColor: "#fff",
  },
  icon: {
    position: "absolute",
    top: 24,
    left: 20,
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  other: {
    marginVertical: 10,
  },
  continueText: {
    fontSize: TextSize.tiny,
    fontFamily: "font-bold",
    marginVertical: 10,
    textTransform: "capitalize",
    textAlign: "center",
  },
  optionsContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  googleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    width: 240,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.8,
    elevation: 3,
  },
  googleImage: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
  },
  googleText: {
    fontFamily: "font-medium",
    fontSize: TextSize.small,
    marginHorizontal: 5,
  },
  accountText: {
    fontSize: TextSize.tiny,
    textTransform: "capitalize",
  },
})

export default SignUpScreen
