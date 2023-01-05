import { NavigationContainer } from "@react-navigation/native"
import {
  fireEvent,
  screen,
  render,
  waitFor,
} from "@testing-library/react-native"
import React from "react"
import { OTPFormScreenUI } from "../../screen"

const sendPin = jest.fn()

const pinValue = "1"

const renderComponent = () => {
  render(
    <NavigationContainer>
      <OTPFormScreenUI sendPin={sendPin} />
    </NavigationContainer>,
  )

  const pin1 = screen.getByLabelText("pin1")
  const pin2 = screen.getByLabelText("pin2")
  const pin3 = screen.getByLabelText("pin3")
  const pin4 = screen.getByLabelText("pin4")
  const button = screen.getByTestId("pressable")

  return { pin1, pin2, pin3, button, pin4 }
}

describe("OTP form screen UI", () => {
  it("renders correctly", () => {
    const { button, pin1, pin2, pin3, pin4 } = renderComponent()

    expect(screen.getAllByTestId("squareInput")).toHaveLength(4)

    expect(pin1).toBeOnTheScreen()
    expect(pin2).toBeOnTheScreen()
    expect(pin3).toBeOnTheScreen()
    expect(pin4).toBeOnTheScreen()

    expect(button).toBeOnTheScreen()
    expect(screen.getByText("next")).toBeOnTheScreen()
  })

  it("ensures all input changes", () => {
    const { pin1, pin2, pin3, pin4 } = renderComponent()

    fireEvent.changeText(pin1, pinValue)
    fireEvent.changeText(pin2, pinValue)
    fireEvent.changeText(pin3, pinValue)
    fireEvent.changeText(pin4, pinValue)

    expect(pin1).toHaveProp("value", pinValue)
    expect(pin2).toHaveProp("value", pinValue)
    expect(pin3).toHaveProp("value", pinValue)
    expect(pin4).toHaveProp("value", pinValue)
  })

  it("ensures more than one value can't be added to an input", () => {
    const { pin1, pin2, pin3, pin4 } = renderComponent()

    expect(pin1).toHaveProp("maxLength", 1)
    expect(pin2).toHaveProp("maxLength", 1)
    expect(pin3).toHaveProp("maxLength", 1)
    expect(pin4).toHaveProp("maxLength", 1)
  })

  it("ensures form is not submitted when empty", async () => {
    const { button } = renderComponent()

    fireEvent.press(button)

    await waitFor(() => expect(sendPin).not.toHaveBeenCalled())
  })

  it("ensures the form is submitted", async () => {
    const { button, pin1, pin2, pin3, pin4 } = renderComponent()

    fireEvent.changeText(pin1, pinValue)
    fireEvent.changeText(pin2, pinValue)
    fireEvent.changeText(pin3, pinValue)
    fireEvent.changeText(pin4, pinValue)

    fireEvent.press(button)

    await waitFor(() => expect(sendPin).toHaveBeenCalled())
    expect(sendPin).toHaveBeenCalledWith(
      { pin1: pinValue, pin2: pinValue, pin3: pinValue, pin4: pinValue },
      undefined,
    )
  })
})
