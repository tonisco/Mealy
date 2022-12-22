import React from "react"
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native"

import GradientBackground from "../ui/GradientBackground"
import GradientButton from "../ui/GradientButton"
import GradientText from "../ui/GradientText"
import Colors from "../utils/Colors"
import TextSize from "../utils/TextSize"

type Props = {
  heading: string
  description: string
  onPress: () => void
  page: number
  ImageComponent: React.ReactElement<Image>
}

const onboarding = ({
  heading,
  description,
  onPress,
  page,
  ImageComponent,
}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        {ImageComponent}
        <GradientText style={styles.headingText} text={heading} />
        <View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <View style={styles.points}>
        {Array.from({ length: 3 }, (_, i) =>
          i + 1 === page ? (
            <GradientBackground key={i + 1} style={styles.point} />
          ) : (
            <View key={i + 1} style={[styles.point, styles.bg_gray]} />
          ),
        )}
      </View>
      <View style={styles.buttonContainer}>
        <GradientButton text="next" onPress={onPress} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  headingText: {
    fontSize: TextSize.x_large,
    textTransform: "uppercase",
  },
  description: {
    textTransform: "uppercase",
    fontSize: TextSize.tiny,
    color: Colors.dark,
    textAlign: "center",
    fontFamily: "font-regular",
    lineHeight: 13,
    marginTop: 3,
  },
  points: {
    flexDirection: "row",
  },
  point: {
    height: 10,
    width: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  bg_gray: {
    backgroundColor: Colors.liteGray,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
  },
})

export default onboarding
