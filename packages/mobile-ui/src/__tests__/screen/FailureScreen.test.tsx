import { NavigationContainer } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  fireEvent,
  screen,
  render,
  waitFor,
} from "@testing-library/react-native"
import React from "react"
import { FailureScreen } from "../../screen"
import { AuthScreenType } from "../../screenTypes/default"

const route = {
  params: {
    nextScreen: "Log In",
    nextScreenParams: { animation: false },
    message: "This is the message",
  },
}

const reset = jest.fn()

const getPropsWithNavigation = (
  props?: any,
  navigationPropExtension?: Partial<
    NativeStackScreenProps<AuthScreenType, "Failure Screen">
  >,
) =>
  ({
    ...props,
    navigation: {
      navigate: jest.fn(),
      reset,
      ...navigationPropExtension,
    },
    route,
  } as any)

const renderComponent = () => {
  render(
    <NavigationContainer>
      <FailureScreen {...getPropsWithNavigation()} />
    </NavigationContainer>,
  )
}

describe("Failure screen", () => {
  it("renders correctly", () => {
    renderComponent()
    expect(screen.getByText(route.params.message)).toBeOnTheScreen()
    expect(screen.getByText("next")).toBeOnTheScreen()
    expect(screen.getByTestId("pressable")).toBeOnTheScreen()
  })

  it("ensures navigation is called with the right params", async () => {
    renderComponent()
    fireEvent.press(screen.getByTestId("pressable"))

    await waitFor(() => expect(reset).toHaveBeenCalled())

    expect(reset).toHaveBeenLastCalledWith({
      index: 0,
      routes: [
        {
          name: route.params.nextScreen,
          params: route.params.nextScreenParams,
        },
      ],
    })
  })
})
