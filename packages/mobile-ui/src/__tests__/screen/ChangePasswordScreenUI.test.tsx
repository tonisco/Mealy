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

describe("change password screen ui", () => {
  it("renders correctly", () => {
    render(
      <NavigationContainer>
        <ChangePasswordScreenUI changePassword={changePassword} />
      </NavigationContainer>,
    )

    expect(screen.getByPlaceholderText("Password")).toBeOnTheScreen()
    expect(screen.getByPlaceholderText("Confirm Password")).toBeOnTheScreen()

    expect(screen.getByText("save")).toBeOnTheScreen()
    expect(screen.getByTestId("pressable")).toBeOnTheScreen()

    expect(screen.queryAllByTestId("errorMessage")).toHaveLength(0)
  })

  it("ensures the input changes", () => {
    render(
      <NavigationContainer>
        <ChangePasswordScreenUI changePassword={changePassword} />
      </NavigationContainer>,
    )

    const password = screen.getByPlaceholderText("Password")
    const confirmPassword = screen.getByPlaceholderText("Confirm Password")

    fireEvent.changeText(password, shortPassword)
    fireEvent.changeText(confirmPassword, shortPassword)

    expect(password).toHaveProp("value", shortPassword)
    expect(confirmPassword).toHaveProp("value", shortPassword)
  })

  it("ensures the password length error shows", async () => {
    render(
      <NavigationContainer>
        <ChangePasswordScreenUI changePassword={changePassword} />
      </NavigationContainer>,
    )

    const password = screen.getByPlaceholderText("Password")
    const confirmPassword = screen.getByPlaceholderText("Confirm Password")
    const saveButton = screen.getByTestId("pressable")

    fireEvent.changeText(password, shortPassword)
    fireEvent.changeText(confirmPassword, shortPassword)

    fireEvent.press(saveButton)

    expect(await screen.findByLabelText("password")).toHaveTextContent(
      wrongPasswordMessage,
    )
    await waitFor(() => expect(changePassword).not.toHaveBeenCalled())
  })

  it("ensures the password do not match error shows", async () => {
    render(
      <NavigationContainer>
        <ChangePasswordScreenUI changePassword={changePassword} />
      </NavigationContainer>,
    )

    const password = screen.getByPlaceholderText("Password")
    const confirmPassword = screen.getByPlaceholderText("Confirm Password")
    const saveButton = screen.getByTestId("pressable")

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
    render(
      <NavigationContainer>
        <ChangePasswordScreenUI changePassword={changePassword} />
      </NavigationContainer>,
    )

    const password = screen.getByPlaceholderText("Password")
    const confirmPassword = screen.getByPlaceholderText("Confirm Password")
    const saveButton = screen.getByTestId("pressable")

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
