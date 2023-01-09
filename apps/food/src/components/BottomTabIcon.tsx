import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs"
import { slideInLeft, slideInRight, zoomInLeft } from "mobile-ui/src/animation"
import React from "react"
import { View, Image, ImageSourcePropType, Pressable } from "react-native"
import Animated from "react-native-reanimated"

type Props = BottomTabBarButtonProps & {
  title: string
  image: ImageSourcePropType
}

const BottomTabIcon = ({
  title,
  accessibilityState,
  onPress,
  image,
}: Props) => {
  const isActive = accessibilityState?.selected

  if (!isActive)
    return (
      <Pressable
        className="flex-1 items-center justify-center"
        onPress={onPress}
      >
        <View className="flex-row items-center justify-center">
          <Image source={image} className="h-6 w-6" />
        </View>
      </Pressable>
    )

  return (
    <Pressable
      className="flex-[1.2] items-center justify-center"
      onPress={onPress}
    >
      <View className="relative flex-row items-center justify-center gap-x-2 rounded-lg py-2 px-3">
        <Animated.Image
          source={image}
          className="h-6 w-6 translate-x-4"
          entering={slideInRight}
        />

        <Animated.Text
          className="-translate-x-4 font-bento-med text-xs capitalize text-dark"
          entering={slideInLeft}
        >
          {title}
        </Animated.Text>
        <Animated.View
          className="absolute -z-50 h-[40] w-[100] rounded-lg bg-green-100 py-2"
          entering={zoomInLeft}
        />
      </View>
    </Pressable>
  )
}

export default BottomTabIcon
