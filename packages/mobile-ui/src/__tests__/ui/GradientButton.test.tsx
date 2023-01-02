import { screen, render, fireEvent } from "@testing-library/react-native"
import React from "react"

import { GradientButton } from "../../ui"

const onPress = jest.fn()
const text = "this is the button"

describe("Gradient Button", () => {
  it("renders successfully", () => {
    render(<GradientButton onPress={onPress} text={text} />)

    fireEvent.press(screen.getByTestId("pressable"))
    expect(onPress).toHaveBeenCalled()

    expect(screen.getByText(text)).toBeOnTheScreen()
  })
})
