import { render, screen } from "@testing-library/react-native"
import React from "react"

import { GradientText } from "../../ui"

describe("Gradient text", () => {
  const text = "Gradient Text"
  it("renders text correctly", () => {
    render(<GradientText text={text} className="text-lg" />)

    const textValues = screen.getAllByText(text)

    expect(textValues).toHaveLength(2)

    textValues.map((textValue) => {
      expect(textValue).toHaveStyle({ fontSize: 18 })
    })
  })
})
