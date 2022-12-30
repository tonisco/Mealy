import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { View, Image, StyleSheet, Text } from "react-native"

import { AuthScreenType } from "../screenTypes/default"
import GradientButton from "../ui/GradientButton"
import GradientText from "../ui/GradientText"
import TextSize from "../utils/TextSize"

type Props = NativeStackScreenProps<AuthScreenType, "Success Screen">

const SuccessScreen = ({ navigation, route }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/success.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.textContainer}>
        <GradientText text="Congrats" style={styles.heading} />
        <Text style={styles.description}>{route.params.message}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <GradientButton
          text="next"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: route.params.nextScreen,
                  params: { ...route.params.nextScreenParams },
                },
              ],
            })
          }
        />
      </View>
    </View>
  )
}

export default SuccessScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 50,
  },
  image: {
    height: 200,
    width: 215,
  },
  textContainer: {
    marginTop: 30,
  },
  heading: {
    marginVertical: 10,
    fontSize: TextSize.large,
  },
  description: {
    fontFamily: "font-bold",
    fontSize: TextSize.regular,
    textTransform: "capitalize",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
})
