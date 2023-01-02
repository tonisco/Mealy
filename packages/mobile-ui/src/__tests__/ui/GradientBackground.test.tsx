import { screen, render } from "@testing-library/react-native"
import React from "react"
import { Text } from "react-native"

import { GradientBackground } from "../../ui"

const style = { height: 200 }
const text = "this is text"
const testId = "gradientBackground"

describe("Gradient Background", () => {
  it("render component correctly", () => {
    render(
      <GradientBackground
        children={<Text>{text}</Text>}
        style={style}
        testID={testId}
      />,
    )

    const gradient = screen.getByTestId(testId)
    expect(gradient).toBeOnTheScreen()
    expect(gradient).toHaveStyle(style)

    expect(screen.getByText(text)).toBeOnTheScreen()
  })
})
