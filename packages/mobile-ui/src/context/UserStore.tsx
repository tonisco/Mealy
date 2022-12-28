import React, { createContext, ReactNode, useContext, useState } from "react"

type userContext = {
  hasOpenedApp: boolean
  setHasOpenedApp: React.Dispatch<React.SetStateAction<boolean>>
  user: object
  setUser: React.Dispatch<React.SetStateAction<object>>
}

const UserContext = createContext<userContext | null>(null)

const UserStore = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({})
  const [hasOpenedApp, setHasOpenedApp] = useState(false)

  return (
    <UserContext.Provider
      value={{ hasOpenedApp, setHasOpenedApp, setUser, user }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UseUserState = () => {
  const context = useContext(UserContext)

  if (!context) throw new Error("User Context not available at this location")

  return context
}

export default UserStore
