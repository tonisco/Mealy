import Colors from "mobile-constants/src/Colors"
import TextSize from "mobile-constants/src/TextSize"
import React from "react"
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  StyleSheet,
} from "react-native"

import GradientButton from "../ui/GradientButton"
import GradientBackground from "../utils/GradientBackground"
import TextClip from "../utils/TextClip"

type Props = {
  heading: string
  description: string
  onPress: () => void
  page: number
  Image: React.ReactElement<Image>
}

const onboarding = ({ heading, description, onPress, page, Image }: Props) => {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.main}>
        {Image}
        <TextClip text={heading} />
        <View>
          <Text style={style.description}>{description}</Text>
        </View>
      </View>
      <View style={style.points}>
        {Array.from({ length: 3 }, (_, i) =>
          i + 1 === page ? (
            <GradientBackground key={i + 1} style={style.point} />
          ) : (
            <View key={i + 1} style={[style.point, style.bg_gray]}></View>
          ),
        )}
      </View>
      <Pressable onPress={onPress} style={style.buttonContainer}>
        <GradientButton>
          <Text style={style.buttonText}>next</Text>
        </GradientButton>
      </Pressable>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    alignItems: "center",
    paddingHorizontal: 17,
    marginBottom: 40,
  },
  description: {
    textTransform: "uppercase",
    fontSize: TextSize.tiny,
    color: Colors.dark,
    textAlign: "center",
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
  buttonText: {
    color: "white",
    textTransform: "uppercase",
    fontSize: TextSize.small,
  },
})

// className="mt-1 text-xs capitalize text-dark"

export default onboarding
