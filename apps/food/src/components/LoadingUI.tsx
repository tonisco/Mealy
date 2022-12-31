import React, { useEffect } from "react"
import { View } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
} from "react-native-reanimated"

const LoadingUI = () => {
  const scale = useSharedValue(1.5)

  const loadingStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: scale.value }] }
  }, [])

  useEffect(() => {
    scale.value = withRepeat(withSpring(0.8), -1, true)
  }, [scale])

  console.log(scale.value)

  return (
    <View className="absolute z-10 h-full w-full">
      <View className="flex-1 bg-black opacity-80" />
      <View className="absolute h-full w-full items-center justify-center">
        <Animated.Image
          source={require("../../assets/images/logosmall.png")}
          resizeMode="contain"
          className="h-[50px] w-[119px]"
          style={loadingStyle}
        />
      </View>
    </View>
  )
}

export default LoadingUI
