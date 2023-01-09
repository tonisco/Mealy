import { NavigatorScreenParams } from "@react-navigation/native"

export type MainScreenType = {
  Main: NavigatorScreenParams<HomeScreenType>
  Search: undefined
  Orders: undefined
  User: undefined
}

export type HomeScreenType = {
  Home: undefined
}
