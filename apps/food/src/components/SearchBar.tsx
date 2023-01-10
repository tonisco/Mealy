import React from "react"
import { Image, TextInput, View } from "react-native"

type Props = {
  showFilterIcon: boolean
  navigate?: () => void
}

const SearchBar = ({ showFilterIcon, navigate }: Props) => {
  return (
    <View className="relative w-full self-center rounded-lg bg-white px-3 py-3">
      <Image
        source={require("../../assets/images/icons/Search1.png")}
        className="absolute top-4 left-3 h-6 w-6"
      />
      <TextInput
        placeholder="Find your favorite restaurant and food"
        className=" w-full px-10 text-xs font-medium capitalize"
        onFocus={navigate}
      />
      {showFilterIcon && (
        <Image
          source={require("../../assets/images/icons/Filter.png")}
          className="absolute top-4 right-3 h-6 w-6"
        />
      )}
    </View>
  )
}

export default SearchBar
