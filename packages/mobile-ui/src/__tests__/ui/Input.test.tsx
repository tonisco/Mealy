import { renderHook } from "@testing-library/react-hooks"
import { screen, render, fireEvent } from "@testing-library/react-native"
import React from "react"
import { useForm } from "react-hook-form"

import { Input } from "../../ui"

const email = "example@mail.com"
const errorMessage = "Please enter a valid email"

describe("Input", () => {
  it("render component correctly", () => {
    const { result, unmount } = renderHook(() =>
      useForm({ defaultValues: { email: "" } }),
    )
    render(
      <Input
        control={result.current.control}
        keyboardType="phone-pad"
        inputName="email"
        placeholder="Email"
        iconName="add"
      />,
    )
    const formInput = screen.getByPlaceholderText("Email")
    expect(formInput).toBeOnTheScreen()
    expect(formInput).toHaveProp("keyboardType", "phone-pad")

    expect(screen.queryByTestId("eye")).not.toBeOnTheScreen()
    expect(screen.queryByTestId("eye-off")).not.toBeOnTheScreen()

    expect(screen.queryByTestId("errorMessage")).not.toBeOnTheScreen()

    unmount()
  })

  it("ensures input works", () => {
    const { result, unmount } = renderHook(() =>
      useForm({ defaultValues: { email: "" } }),
    )
    render(
      <Input
        control={result.current.control}
        inputName="email"
        placeholder="Email"
        iconName="add"
      />,
    )
    const formInput = screen.getByPlaceholderText("Email")
    expect(formInput).toHaveProp("value", "")
    expect(formInput).toHaveProp("keyboardType", "default")

    fireEvent.changeText(formInput, email)
    expect(formInput).toHaveProp("value", email)

    unmount()
  })

  it("shows the error message", () => {
    const { result, unmount } = renderHook(() =>
      useForm({ defaultValues: { email: "" } }),
    )
    render(
      <Input
        control={result.current.control}
        inputName="email"
        placeholder="Email"
        error={errorMessage}
        iconName="add"
      />,
    )

    expect(screen.getByTestId("errorMessage")).toHaveTextContent(errorMessage)
    unmount()
  })

  it("ensures the eye icon renders correctly when encrypt is passed", () => {
    const { result, unmount } = renderHook(() =>
      useForm({ defaultValues: { email: "" } }),
    )
    render(
      <Input
        control={result.current.control}
        inputName="email"
        placeholder="Email"
        error={errorMessage}
        encrypt
        iconName="add"
      />,
    )

    expect(screen.queryByTestId("eye-off")).toBeOnTheScreen()
    expect(screen.queryByTestId("eye")).not.toBeOnTheScreen()

    fireEvent.press(screen.queryByTestId("eye-off"))

    expect(screen.queryByTestId("eye")).toBeOnTheScreen()
    expect(screen.queryByTestId("eye-off")).not.toBeOnTheScreen()

    fireEvent.press(screen.queryByTestId("eye"))

    expect(screen.queryByTestId("eye-off")).toBeOnTheScreen()
    expect(screen.queryByTestId("eye")).not.toBeOnTheScreen()

    unmount()
  })
})
