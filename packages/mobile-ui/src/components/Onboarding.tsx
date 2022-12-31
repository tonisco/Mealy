import React from "react"
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native"

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
  ImageLink: ImageSourcePropType
  className?: string
}

const onboarding = ({
  heading,
  description,
  onPress,
  page,
  ImageLink,
  className,
}: Props) => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View className="mb-10 items-center px-4">
        <Image
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          className={`h-52 w-52 ${className}`}
          source={ImageLink}
          resizeMode="contain"
        />
        <GradientText style={styles.headingText} text={heading} />
        <View>
          <Text className="mt-1 text-center font-bento-reg text-xs uppercase leading-4 text-dark">
            {description}
          </Text>
        </View>
      </View>
      <View className="flex-row">
        {Array.from({ length: 3 }, (_, i) =>
          i + 1 === page ? (
            <GradientBackground key={i + 1} style={styles.point} />
          ) : (
            <View
              key={i + 1}
              className="mx-1 h-3 w-3 rounded-full bg-lite-gray"
            />
          ),
        )}
      </View>
      <View className="absolute bottom-12">
        <GradientButton text="next" onPress={onPress} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: TextSize.x_large,
    textTransform: "uppercase",
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
})

export default onboarding
