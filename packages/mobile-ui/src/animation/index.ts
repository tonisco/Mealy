import { Dimensions } from "react-native"
import { withTiming } from "react-native-reanimated"

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
