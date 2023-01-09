import { NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  fireEvent,
  screen,
  render,
  waitFor,
} from "@testing-library/react-native"
import React from "react"
import { requiredPasswordMessage, wrongEmailMessage } from "schema"
import { LoginScreenUI } from "../../screen"
import { AuthScreenType } from "../../screenTypes/default"

const props = {
  googleImageSource: require(""),
  logoImageSource: require(""),
  loginAccount: jest.fn(),
  logoText: "This is the logo text",
}

const navigate = jest.fn()

const getPropsWithNavigation = (
  props?: any,
  navigationPropExtension?: Partial<
    NativeStackScreenProps<AuthScreenType, "Log In">
  >,
) =>
  ({
    ...props,
    navigation: {
      navigate,
      goBack: jest.fn(),
      ...navigationPropExtension,
    },
    route: {
      params: { animation: false },
    },
  } as any)

const renderComponent = () => {
  render(<LoginScreenUI {...getPropsWithNavigation(props)} />)

  const email = screen.getByPlaceholderText("Email")
  const password = screen.getByPlaceholderText("Password")

  const button = screen.getByTestId("pressable")

  return { email, password, button }
}

const wrongEmail = "test"
const realEmail = "test@mail.com"
const longPassword = "123456"

describe("Login screen UI", () => {
  it("renders correctly", () => {
    const { email, button, password } = renderComponent()

    expect(button).toBeOnTheScreen()
    expect(screen.getByText("Login")).toBeOnTheScreen()
    expect(email).toBeOnTheScreen()
    expect(password).toBeOnTheScreen()

    expect(screen.getAllByText(props.logoText)).toHaveLength(2)
    expect(screen.getByText("Google")).toBeOnTheScreen()

    expect(screen.getAllByText("Forgot Password")).toHaveLength(2)
    expect(screen.getByTestId("forgotPasswordLink")).toBeOnTheScreen()

    expect(screen.getAllByText("Don't have an account? Sign Up")).toHaveLength(
      2,
    )
    expect(screen.getByTestId("SignUpLink")).toBeOnTheScreen()
  })

  it("ensures all input changes", () => {
    const { email, password } = renderComponent()

    fireEvent.changeText(email, realEmail)
    fireEvent.changeText(password, longPassword)

    expect(password).toHaveProp("value", longPassword)
    expect(email).toHaveProp("value", realEmail)
  })

  it("ensures errors are show for empty fields", async () => {
    const { button } = renderComponent()

    fireEvent.press(button)

    expect(await screen.findByLabelText("email")).toHaveTextContent(
      wrongEmailMessage,
    )

    expect(await screen.findByLabelText("password")).toHaveTextContent(
      requiredPasswordMessage,
    )

    expect(props.loginAccount).not.toHaveBeenCalled()
  })

  it("ensures email error is shown if input is wrong", async () => {
    const { email, button, password } = renderComponent()

    fireEvent.changeText(email, wrongEmail)
    fireEvent.changeText(password, longPassword)

    fireEvent.press(button)

    expect(await screen.findByLabelText("email")).toHaveTextContent(
      wrongEmailMessage,
    )
    expect(props.loginAccount).not.toHaveBeenCalled()
  })

  it("ensures there is no error for wrong input and form is submitted", async () => {
    const { email, button, password } = renderComponent()

    fireEvent.changeText(email, realEmail)
    fireEvent.changeText(password, longPassword)

    fireEvent.press(button)

    expect(await screen.queryByLabelText("email")).not.toBeOnTheScreen()

    await waitFor(() => expect(props.loginAccount).toHaveBeenCalled())
    expect(props.loginAccount).toHaveBeenCalledWith(
      { email: realEmail, password: longPassword },
      undefined,
    )
  })

  it("navigates to forgot password screen", async () => {
    renderComponent()
    fireEvent.press(screen.getByTestId("forgotPasswordLink"))

    await waitFor(() => {
      expect(navigate).toHaveBeenCalled()
    })

    expect(navigate).toHaveBeenCalledWith("Reset Password")
  })

  it("navigates to sign up screen", async () => {
    renderComponent()
    fireEvent.press(screen.getByTestId("SignUpLink"))

    await waitFor(() => {
      expect(navigate).toHaveBeenCalled()
    })

    expect(navigate).toHaveBeenCalledWith("Sign Up", { animation: false })
  })
})
