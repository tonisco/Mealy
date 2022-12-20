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
  country: string
}

type SignUpContextType = {
  value: FormContextType
  saveValue: React.Dispatch<React.SetStateAction<FormContextType>>
}

const SignUpContext = createContext<SignUpContextType | null>(null)

const SignUpStore = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<FormContextType>({
    city: "",
    confirmPassword: "",
    country: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    street: "",
  })

  return (
    <SignUpContext.Provider value={{ value: state, saveValue: setState }}>
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
