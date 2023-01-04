import { NavigationContainer } from "@react-navigation/native"
import {
  screen,
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react-native"
import React from "react"
import { wrongPasswordMessage, passwordNotMatchMessage } from "schema"

import { ChangePasswordScreenUI } from "../../screen"

const changePassword = jest.fn(
  async (data: { password: string; confirmPassword: string }) => {
    await Promise.resolve(data)
  },
)

const shortPassword = "12345"
const longPassword = "123456"

const renderComponent = () => {
  render(
    <NavigationContainer>
      <ChangePasswordScreenUI changePassword={changePassword} />
    </NavigationContainer>,
  )

  const password = screen.getByPlaceholderText("Password")
  const confirmPassword = screen.getByPlaceholderText("Confirm Password")
  const saveButton = screen.getByTestId("pressable")

  return { password, confirmPassword, saveButton }
}

describe("change password screen ui", () => {
  it("renders correctly", () => {
    const { confirmPassword, password, saveButton } = renderComponent()

    expect(password).toBeOnTheScreen()
    expect(confirmPassword).toBeOnTheScreen()

    expect(screen.getByText("save")).toBeOnTheScreen()
    expect(saveButton).toBeOnTheScreen()

    expect(screen.queryAllByTestId("errorMessage")).toHaveLength(0)
  })

  it("ensures the input changes", () => {
    const { confirmPassword, password } = renderComponent()

    fireEvent.changeText(password, shortPassword)
    fireEvent.changeText(confirmPassword, shortPassword)

    expect(password).toHaveProp("value", shortPassword)
    expect(confirmPassword).toHaveProp("value", shortPassword)
  })

  it("ensures the password length error shows", async () => {
    const { confirmPassword, password, saveButton } = renderComponent()

    fireEvent.changeText(password, shortPassword)
    fireEvent.changeText(confirmPassword, shortPassword)

    fireEvent.press(saveButton)

    expect(await screen.findByLabelText("password")).toHaveTextContent(
      wrongPasswordMessage,
    )
    await waitFor(() => expect(changePassword).not.toHaveBeenCalled())
  })

  it("ensures the password do not match error shows", async () => {
    const { confirmPassword, password, saveButton } = renderComponent()

    fireEvent.changeText(password, longPassword)
    fireEvent.changeText(confirmPassword, shortPassword)

    fireEvent.press(saveButton)

    expect(await screen.queryByLabelText("password")).not.toBeOnTheScreen()
    expect(await screen.findByLabelText("confirmPassword")).toHaveTextContent(
      passwordNotMatchMessage,
    )
    await waitFor(() => expect(changePassword).not.toHaveBeenCalled())
  })

  it("no error shows and form is submitted", async () => {
    const { confirmPassword, password, saveButton } = renderComponent()

    fireEvent.changeText(password, longPassword)
    fireEvent.changeText(confirmPassword, longPassword)

    fireEvent.press(saveButton)

    expect(await screen.queryByLabelText("password")).not.toBeOnTheScreen()
    expect(
      await screen.queryByLabelText("confirmPasword"),
    ).not.toBeOnTheScreen()

    await waitFor(() => expect(changePassword).toBeCalled())
    expect(changePassword).toBeCalledWith(
      {
        confirmPassword: "123456",
        password: "123456",
      },
      undefined,
    )
  })
})
