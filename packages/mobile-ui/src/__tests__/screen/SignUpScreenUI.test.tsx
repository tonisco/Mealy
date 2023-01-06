import { NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  fireEvent,
  screen,
  render,
  waitFor,
} from "@testing-library/react-native"
import React from "react"
import {
  passwordNotMatchMessage,
  wrongEmailMessage,
  wrongPasswordMessage,
} from "schema"
import { initialState, SignUpContext } from "../../context"
import { SignUpScreenUI } from "../../screen"
import { AuthScreenType } from "../../screenTypes/default"

const props = {
  googleImageSource: require(""),
  logoImageSource: require(""),
  createAccount: jest.fn(),
  logoText: "This is the logo text",
}

const getPropsWithNavigation = (
  props?: any,
  navigationPropExtension?: Partial<
    NativeStackScreenProps<AuthScreenType, "Log In">
  >,
) =>
  ({
    ...props,
    navigation: {
      navigate: jest.fn(),
      goBack: jest.fn(),
      ...navigationPropExtension,
    },
    route: {
      params: { animation: false },
    },
  } as any)

const value = {
  clearState: jest.fn(),
  setSignUpState: jest.fn(),
  signUpState: { ...initialState },
}

const renderComponentWithoutAnimation = () => {
  render(
    <SignUpContext.Provider value={{ ...value }}>
      <SignUpScreenUI {...getPropsWithNavigation(props)} />
    </SignUpContext.Provider>,
  )

  const email = screen.getByPlaceholderText("Email")
  const password = screen.getByPlaceholderText("Password")
  const confirmPassword = screen.getByPlaceholderText("Confirm Password")

  const button = screen.getByTestId("pressable")

  return { email, password, confirmPassword, button }
}

const wrongEmail = "test"
const realEmail = "test@mail.com"
const shortPassword = "12345"
const longPassword = "123456"

describe("Sign up screen UI", () => {
  it("renders correctly", () => {
    const { email, button, password, confirmPassword } =
      renderComponentWithoutAnimation()

    expect(button).toBeOnTheScreen()
    expect(screen.getByText("Create Account")).toBeOnTheScreen()
    expect(email).toBeOnTheScreen()
    expect(password).toBeOnTheScreen()
    expect(confirmPassword).toBeOnTheScreen()

    expect(screen.getAllByText(props.logoText)).toHaveLength(2)
    expect(screen.getByText("Google")).toBeOnTheScreen()

    expect(screen.getAllByText("Already have an account? Login")).toHaveLength(
      2,
    )
    expect(screen.getByTestId("loginLink")).toBeOnTheScreen()
  })

  it("ensures all input changes", () => {
    const { email, password, confirmPassword } =
      renderComponentWithoutAnimation()

    fireEvent.changeText(email, realEmail)
    fireEvent.changeText(password, longPassword)
    fireEvent.changeText(confirmPassword, longPassword)

    expect(password).toHaveProp("value", longPassword)
    expect(confirmPassword).toHaveProp("value", longPassword)
    expect(email).toHaveProp("value", realEmail)
  })

  it("ensures errors are show for empty fields", async () => {
    const { button } = renderComponentWithoutAnimation()

    fireEvent.press(button)

    expect(await screen.findByLabelText("email")).toHaveTextContent(
      wrongEmailMessage,
    )
    expect(await screen.findByLabelText("password")).toHaveTextContent(
      wrongPasswordMessage,
    )
    expect(props.createAccount).not.toHaveBeenCalled()
  })

  it("ensures email and password error is shown if input is wrong", async () => {
    const { email, button, password } = renderComponentWithoutAnimation()

    fireEvent.changeText(email, wrongEmail)
    fireEvent.changeText(password, shortPassword)

    fireEvent.press(button)

    expect(await screen.findByLabelText("email")).toHaveTextContent(
      wrongEmailMessage,
    )
    expect(await screen.findByLabelText("password")).toHaveTextContent(
      wrongPasswordMessage,
    )

    expect(props.createAccount).not.toHaveBeenCalled()
  })

  it("ensures confirm password error is shown if passwords do not match", async () => {
    const { email, button, password, confirmPassword } =
      renderComponentWithoutAnimation()

    fireEvent.changeText(email, realEmail)
    fireEvent.changeText(password, longPassword)
    fireEvent.changeText(confirmPassword, shortPassword)

    fireEvent.press(button)

    expect(await screen.findByLabelText("confirmPassword")).toHaveTextContent(
      passwordNotMatchMessage,
    )

    expect(props.createAccount).not.toHaveBeenCalled()
  })

  it("ensures there is no error for wrong input and form is submitted", async () => {
    const { email, button, password, confirmPassword } =
      renderComponentWithoutAnimation()

    fireEvent.changeText(email, realEmail)
    fireEvent.changeText(password, longPassword)
    fireEvent.changeText(confirmPassword, longPassword)

    fireEvent.press(button)

    expect(await screen.queryByLabelText("email")).not.toBeOnTheScreen()

    await waitFor(() => expect(props.createAccount).toHaveBeenCalled())
    expect(props.createAccount).toHaveBeenCalledWith(
      {
        email: realEmail,
        password: longPassword,
        confirmPassword: longPassword,
      },
      undefined,
    )
  })
})
