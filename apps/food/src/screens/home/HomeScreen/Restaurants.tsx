import { Restaurant } from "db/src"
import React from "react"
import { Text, FlatList } from "react-native"

import LoadingRestaurant from "../../../components/LoadingRestaurant"
import RestaurantsCard from "../../../components/RestaurantsCard"

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
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={RestaurantsCard}
    />
  )
}

export default Restaurants
