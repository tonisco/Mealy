import { Food, Restaurant } from "db/src"
import React from "react"
import { Text } from "react-native"
import { FlatList } from "react-native-gesture-handler"

import LoadingSpecialOffers from "../../../components/LoadingSpecialOffers"
import SpecialOfferCard from "../../../components/SpecialOfferCard"

type Props = {
  data?: (Food & { restaurant: Restaurant })[]
  isLoading: boolean
}

const SpecialOffers = ({ isLoading, data }: Props) => {
  if (isLoading)
    return (
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={Array.from({ length: 3 })}
        renderItem={() => <LoadingSpecialOffers />}
      />
    )

  if (data && data.length === 0) return <Text>I am lower than zero</Text>

  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => (
        <SpecialOfferCard {...item} distanceInTime={10} />
      )}
    />
  )
}

export default SpecialOffers
