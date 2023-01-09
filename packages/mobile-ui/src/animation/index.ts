import { Dimensions } from "react-native"
import { Easing, withTiming } from "react-native-reanimated"

const height = Dimensions.get("screen").height / 2

export const moveToTop = () => {
  "worklet"
  const animations = {
    transform: [{ translateY: withTiming(0, { duration: 900 }) }],
  }
  const initialValues = {
    transform: [{ translateY: height - 148 }],
  }
  return { initialValues, animations }
}

const easing = Easing.bezier(0.17, 0.67, 0.83, 0.67)

export const slideInRight = () => {
  "worklet"
  const animations = {
    transform: [{ translateX: withTiming(0, { duration: 400, easing }) }],
    zIndex: withTiming(0, { duration: 400, easing }),
  }
  const initialValues = {
    transform: [{ translateX: 20 }],
    zIndex: 1,
  }
  return { initialValues, animations }
}

export const slideInLeft = () => {
  "worklet"
  const animations = {
    transform: [{ translateX: withTiming(0, { duration: 400, easing }) }],
    opacity: withTiming(1, { duration: 400, easing }),
    zIndex: withTiming(0, { duration: 400, easing }),
  }
  const initialValues = {
    transform: [{ translateX: -20 }],
    opacity: 0,
    zIndex: -1,
  }
  return { initialValues, animations }
}

export const zoomInLeft = () => {
  "worklet"
  const animations = {
    width: withTiming(100, { duration: 400, easing }),
  }
  const initialValues = {
    width: 0,
  }
  return { initialValues, animations }
}
