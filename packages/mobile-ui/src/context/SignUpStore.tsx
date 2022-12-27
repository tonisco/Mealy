import React, { createContext, ReactNode, useContext, useState } from "react"

type FormContextType = {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phone: string
  street: string
  city: string
  state: string
  country: string
}

type SignUpContextType = {
  signUpState: FormContextType
  setSignUpState: React.Dispatch<React.SetStateAction<FormContextType>>
  clearState: () => void
}

const initialState = {
  city: "",
  confirmPassword: "",
  country: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  phone: "",
  street: "",
  state: "",
}

const SignUpContext = createContext<SignUpContextType | null>(null)

const SignUpStore = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<FormContextType>(initialState)

  const clearState = () => setState(initialState)

  return (
    <SignUpContext.Provider
      value={{ signUpState: state, setSignUpState: setState, clearState }}
    >
      {children}
    </SignUpContext.Provider>
  )
}

export default SignUpStore

export const UseSignUpState = () => {
  const context = useContext(SignUpContext)

  if (!context) {
    throw new Error("The sign up context is not available at this location")
  }
  return context
}
