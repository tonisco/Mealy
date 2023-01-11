import { Restaurant } from "db/src"
import React from "react"
import { View, Text, FlatList } from "react-native"

import LoadingRestaurant from "../../../components/LoadingRestaurant"

type Props = {
  data?: Restaurant[]
  isLoading: boolean
}

const Restaurants = ({ isLoading, data }: Props) => {
  if (isLoading)
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Array.from({ length: 2 })}
        renderItem={() => <LoadingRestaurant />}
      />
    )

  if (data && data.length === 0) return <Text>I am lower than zero</Text>

  return (
    <View>
      <Text>These are the Restaurants</Text>
    </View>
  )
}

export default Restaurants
