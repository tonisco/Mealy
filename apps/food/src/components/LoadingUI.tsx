import React, { useEffect } from "react"
import { View, StyleSheet } from "react-native"
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
    <View style={styles.loadingContainer}>
      <View style={styles.background} />
      <View style={styles.loading}>
        <Animated.Image
          source={require("../../assets/images/logosmall.png")}
          resizeMode="contain"
          style={[styles.logo, loadingStyle]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  background: {
    backgroundColor: "black",
    opacity: 0.8,
    flex: 1,
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 119,
    height: 50,
  },
})

export default LoadingUI
