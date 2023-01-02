import { render, screen } from "@testing-library/react-native"
import React from "react"

import { Onboarding } from "../../components"

const onPress = jest.fn()
const heading = "heading text"
const description = "This is the test description"
const ImageLink = require("")

describe("Onboarding Ui", () => {
  it("renders correctly text correctly", () => {
    render(
      <Onboarding
        description={description}
        page={1}
        heading={heading}
        onPress={onPress}
        ImageLink={ImageLink}
      />,
    )

    expect(screen.getAllByText(/heading text/)).toHaveLength(2)

    expect(screen.getByText(/this is the test description/i)).toBeOnTheScreen()
  })
  it("renders all indicators", () => {
    render(
      <Onboarding
        ImageLink={ImageLink}
        description={description}
        heading={heading}
        onPress={onPress}
        page={1}
      />,
    )

    expect(screen.getByTestId("parentIndicator")).toBeOnTheScreen()

    expect(screen.getAllByTestId(/indicator-/gi)).toHaveLength(3)
  })

  // TODO snapshot test for page inidicator
  it("ensures the page one indicator matches with the current page", () => {
    render(
      <Onboarding
        ImageLink={ImageLink}
        description={description}
        heading={heading}
        onPress={onPress}
        page={1}
      />,
    )
    expect(screen.getAllByTestId(/indicator-/gi)[0]).toHaveProp(
      "testID",
      "indicator-gradient",
    )
  })

  it("ensures the page two indicator matches with the current page", () => {
    render(
      <Onboarding
        ImageLink={ImageLink}
        description={description}
        heading={heading}
        onPress={onPress}
        page={2}
      />,
    )
    expect(screen.getAllByTestId(/indicator-/gi)[1]).toHaveProp(
      "testID",
      "indicator-gradient",
    )
  })

  it("ensures the page three indicator matches with the current page", () => {
    render(
      <Onboarding
        ImageLink={ImageLink}
        description={description}
        heading={heading}
        onPress={onPress}
        page={3}
      />,
    )
    expect(screen.getAllByTestId(/indicator-/gi)[2]).toHaveProp(
      "testID",
      "indicator-gradient",
    )
  })
})
