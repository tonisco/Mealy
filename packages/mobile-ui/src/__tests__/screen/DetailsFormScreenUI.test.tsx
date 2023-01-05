import { NavigationContainer } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  screen,
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react-native"
import React from "react"
import {
  wrongFirstNameMessage,
  wrongLastNameMessage,
  wrongPhoneMessage,
} from "schema"

import { SignUpContext, initialState } from "../../context"
import { DetailsFormScreenUI } from "../../screen"
import { AuthScreenType } from "../../screenTypes/default"

const getPropsWithNavigation = (
  props?: any,
  navigationPropExtension?: Partial<
    NativeStackScreenProps<AuthScreenType, "Details Form">
  >,
) =>
  ({
    ...props,
    navigation: {
      navigate: jest.fn(),
      goBack: jest.fn(),
      ...navigationPropExtension,
    },
  } as any)

const renderComponent = () => {
  const value = {
    clearState: jest.fn(),
    setSignUpState: jest.fn(),
    signUpState: { ...initialState },
  }
  render(
    <SignUpContext.Provider value={{ ...value }}>
      <NavigationContainer>
        <DetailsFormScreenUI {...getPropsWithNavigation()} />
      </NavigationContainer>
    </SignUpContext.Provider>,
  )
  const firstName = screen.getByPlaceholderText("First Name")
  const lastName = screen.getByPlaceholderText("Last Name")
  const phoneNumber = screen.getByPlaceholderText("Phone Number")
  const button = screen.getByTestId("pressable")
  return { firstName, lastName, phoneNumber, button, value }
}

const correctFn = "abel"
const wrongFn = "a"
const correctLn = "cain"
const wrongLn = "c"
const correctPhone = "12345678"
const wrongPhone = "12"

describe("Details form screen UI", () => {
  it("renders correctly", () => {
    const { button, firstName, lastName, phoneNumber } = renderComponent()

    expect(firstName).toBeOnTheScreen()
    expect(lastName).toBeOnTheScreen()
    expect(phoneNumber).toBeOnTheScreen()

    expect(screen.getByText("next")).toBeOnTheScreen()
    expect(button).toBeOnTheScreen()

    expect(screen.queryAllByTestId("errorMessage")).toHaveLength(0)
  })

  it("ensures the input changes", () => {
    const { firstName, lastName, phoneNumber } = renderComponent()

    fireEvent.changeText(firstName, correctFn)
    fireEvent.changeText(lastName, correctLn)
    fireEvent.changeText(phoneNumber, correctPhone)

    expect(firstName).toHaveProp("value", correctFn)
    expect(lastName).toHaveProp("value", correctLn)
    expect(phoneNumber).toHaveProp("value", correctPhone)
  })

  it("ensures all errors are shown if nothing is typed", async () => {
    const { button, value } = renderComponent()

    fireEvent.press(button)

    expect(await screen.findByLabelText("firstName")).toHaveTextContent(
      wrongFirstNameMessage,
    )
    expect(await screen.findByLabelText("lastName")).toHaveTextContent(
      wrongLastNameMessage,
    )
    expect(await screen.findByLabelText("phone")).toHaveTextContent(
      wrongPhoneMessage,
    )
    expect(value.setSignUpState).not.toHaveBeenCalled()
  })

  it("ensures all errors are shown if input is wrong", async () => {
    const { button, value, firstName, lastName, phoneNumber } =
      renderComponent()

    fireEvent.changeText(firstName, wrongFn)
    fireEvent.changeText(lastName, wrongLn)
    fireEvent.changeText(phoneNumber, wrongPhone)

    fireEvent.press(button)

    expect(await screen.findByLabelText("firstName")).toHaveTextContent(
      wrongFirstNameMessage,
    )
    expect(await screen.findByLabelText("lastName")).toHaveTextContent(
      wrongLastNameMessage,
    )
    expect(await screen.findByLabelText("phone")).toHaveTextContent(
      wrongPhoneMessage,
    )
    await waitFor(() => expect(value.setSignUpState).not.toHaveBeenCalled())
  })

  it("no error shows and form is submitted", async () => {
    const { button, firstName, lastName, phoneNumber, value } =
      renderComponent()

    fireEvent.changeText(firstName, correctFn)
    fireEvent.changeText(lastName, correctLn)
    fireEvent.changeText(phoneNumber, correctPhone)

    fireEvent.press(button)

    expect(await screen.queryByLabelText("firstName")).not.toBeOnTheScreen()
    expect(await screen.queryByLabelText("lastName")).not.toBeOnTheScreen()
    expect(await screen.queryByLabelText("phone")).not.toBeOnTheScreen()

    await waitFor(() => expect(value.setSignUpState).toBeCalled())
    expect(value.setSignUpState).toBeCalledWith({
      ...initialState,
      firstName: correctFn,
      lastName: correctLn,
      phone: correctPhone,
    })
  })
})
