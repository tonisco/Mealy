import React, { PropsWithChildren } from "react"
import { FlatList } from "react-native"

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListHeaderComponent={<>{children}</>}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default Wrapper
