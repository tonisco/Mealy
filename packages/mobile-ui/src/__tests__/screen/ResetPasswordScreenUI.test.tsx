import { NavigationContainer } from "@react-navigation/native"
import {
  fireEvent,
  screen,
  render,
  waitFor,
} from "@testing-library/react-native"
import React from "react"
import { wrongEmailMessage } from "schema"
import { ResetPasswordScreenUI } from "../../screen"

const requestOTP = jest.fn()

const fakeEmail = "test"
const realEmail = "test@mail.com"

const renderComponent = () => {
  render(
    <NavigationContainer>
      <ResetPasswordScreenUI requestOTP={requestOTP} />
    </NavigationContainer>,
  )

  const email = screen.getByPlaceholderText("Email")
  const button = screen.getByTestId("pressable")

  return { email, button }
}

describe("Reset password screen UI", () => {
  it("renders correctly", () => {
    const { button, email } = renderComponent()

    expect(email).toBeOnTheScreen()
    expect(screen.getByText("send")).toBeOnTheScreen()
    expect(button).toBeOnTheScreen()
  })

  it("ensures the input changes", () => {
    const { email } = renderComponent()

    fireEvent.changeText(email, realEmail)

    expect(email).toHaveProp("value", realEmail)
  })

  it("ensures error for wrong email", async () => {
    const { button } = renderComponent()

    fireEvent.press(button)

    expect(await screen.findByLabelText("email")).toHaveTextContent(
      wrongEmailMessage,
    )
    await waitFor(() => expect(requestOTP).not.toHaveBeenCalled())
  })

  it("shows error form wrong email", async () => {
    const { button, email } = renderComponent()

    fireEvent.changeText(email, fakeEmail)

    fireEvent.press(button)

    expect(await screen.findByLabelText("email")).toHaveTextContent(
      wrongEmailMessage,
    )
    await waitFor(() => expect(requestOTP).not.toHaveBeenCalled())
  })

  it("shows no error and form submits", async () => {
    const { button, email } = renderComponent()

    fireEvent.changeText(email, realEmail)

    fireEvent.press(button)

    expect(await screen.queryByLabelText("email")).not.toBeOnTheScreen()

    await waitFor(() => expect(requestOTP).toHaveBeenCalled())

    expect(requestOTP).toHaveBeenCalledWith({ email: realEmail }, undefined)
  })
})
