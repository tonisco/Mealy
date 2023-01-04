import {
  screen,
  render,
  renderHook,
  fireEvent,
  waitFor,
} from "@testing-library/react-native"
import React from "react"
import { useForm } from "react-hook-form"

import { SquareInput } from "../../ui"

const changeFocus = jest.fn()
const pin = Math.floor(Math.random() * 10)

const defaultValues = {
  pin1: "",
  pin2: "",
  pin3: "",
  pin4: "",
}

describe("Square input", () => {
  it("renders component correctly", async () => {
    const { result, unmount } = renderHook(() => useForm({ defaultValues }))
    render(
      <SquareInput
        changeFocus={changeFocus}
        name="pin1"
        control={result.current.control}
      />,
    )

    const input = screen.getByTestId("squareInput")

    expect(input).toBeOnTheScreen()

    fireEvent.changeText(input, pin)

    expect(input).toHaveProp("value", pin)
    await waitFor(async () => await expect(changeFocus).toHaveBeenCalled())

    unmount()
  })
})
