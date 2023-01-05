import { NavigationContainer } from "@react-navigation/native"
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native"
import React from "react"
import { initialState, SignUpContext } from "../../context"
import { LocationFormScreenUI } from "../../screen"

const createProfile = jest.fn()

const renderComponent = () => {
  const value = {
    clearState: jest.fn(),
    setSignUpState: jest.fn(),
    signUpState: { ...initialState },
  }

  render(
    <SignUpContext.Provider value={{ ...value }}>
      <NavigationContainer>
        <LocationFormScreenUI createProfile={createProfile} />
      </NavigationContainer>
    </SignUpContext.Provider>,
  )

  const streetAddress = screen.getByPlaceholderText("Street Address")
  const city = screen.getByPlaceholderText("City")
  const state = screen.getByPlaceholderText("State")
  const country = screen.getByPlaceholderText("Country")
  const button = screen.getByTestId("pressable")

  return { streetAddress, city, country, state, button }
}

const stateValue = "state"
const cityValue = "city"
const countryValue = "country"
const streetValue = "street"

describe("Location form screen UI", () => {
  it("renders correctly", () => {
    const { button, city, country, state, streetAddress } = renderComponent()

    expect(state).toBeOnTheScreen()
    expect(city).toBeOnTheScreen()
    expect(country).toBeOnTheScreen()
    expect(streetAddress).toBeOnTheScreen()

    expect(screen.getByText("finish")).toBeOnTheScreen()
    expect(button).toBeOnTheScreen()
  })

  it("ensures all input changes correctly", () => {
    const { city, country, state, streetAddress } = renderComponent()

    fireEvent.changeText(state, stateValue)
    fireEvent.changeText(city, cityValue)
    fireEvent.changeText(country, countryValue)
    fireEvent.changeText(streetAddress, streetValue)

    expect(state).toHaveProp("value", stateValue)
    expect(city).toHaveProp("value", cityValue)
    expect(country).toHaveProp("value", countryValue)
    expect(streetAddress).toHaveProp("value", streetValue)
  })

  //   TODO: check UI if error shows on wrong input
  //   it("ensures all errors are shown", async () => {
  //     const { button } = renderComponent()

  //     fireEvent.press(button)

  //     expect(createProfile).not.toHaveBeenCalled()

  //     expect(await screen.queryByLabelText("city")).toBeOnTheScreen()
  //     expect(await screen.findByLabelText("street")).toBeOnTheScreen()
  //     expect(await screen.findByLabelText("country")).toBeOnTheScreen()
  //     expect(await screen.findByLabelText("state")).toBeOnTheScreen()
  //   })

  it("no error shows and form is submitted", async () => {
    const { button, city, country, state, streetAddress } = renderComponent()

    fireEvent.changeText(city, cityValue)
    fireEvent.changeText(country, countryValue)
    fireEvent.changeText(streetAddress, streetValue)
    fireEvent.changeText(state, stateValue)

    fireEvent.press(button)

    // TODO: check if previous test is fulfilled then fix this
    // expect(await screen.queryByLabelText("firstName")).not.toBeOnTheScreen()
    // expect(await screen.queryByLabelText("lastName")).not.toBeOnTheScreen()
    // expect(await screen.queryByLabelText("phone")).not.toBeOnTheScreen()

    await waitFor(() => expect(createProfile).toBeCalled())
    expect(createProfile).toBeCalledWith(
      {
        city: cityValue,
        country: countryValue,
        state: stateValue,
        street: streetValue,
      },
      undefined,
    )
  })
})
