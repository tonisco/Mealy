import { zodResolver } from "@hookform/resolvers/zod"
import { renderHook } from "@testing-library/react-hooks"
import { screen, render, fireEvent } from "@testing-library/react-native"
import React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Input } from "../../ui"

const email = "example@mail.com"
const errorMessage = "Please enter a valid email"

const resolver = zodResolver(
  z.object({ email: z.string().trim().email({ message: errorMessage }) }),
)

describe("Input", () => {
  it("render component correctly", () => {
    const { result, unmount } = renderHook(() =>
      useForm({ defaultValues: { email: "" }, resolver }),
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
    expect(formInput).toBeOnTheScreen()

    expect(screen.queryByTestId("eye")).not.toBeOnTheScreen()
    expect(screen.queryByTestId("eye-off")).not.toBeOnTheScreen()

    expect(screen.queryByTestId("errorMessage")).not.toHaveTextContent(
      errorMessage,
    )

    unmount()
  })

  it("ensures input works", () => {
    const { result, unmount } = renderHook(() =>
      useForm({ defaultValues: { email: "" }, resolver }),
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

    fireEvent.changeText(formInput, email)
    expect(formInput).toHaveProp("value", email)

    unmount()
  })

  it("shows the error message", () => {
    const { result, unmount } = renderHook(() =>
      useForm({ defaultValues: { email: "" }, resolver }),
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
      useForm({ defaultValues: { email: "" }, resolver }),
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
