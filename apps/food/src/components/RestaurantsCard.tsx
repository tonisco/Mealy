import { IMAGE_URL } from "@env"
import { Restaurant } from "db/src"
import React from "react"
import { View, Text, Image, Dimensions } from "react-native"

type Props = { item: Restaurant }

const RestaurantsCard = ({ item }: Props) => {
  const width = Dimensions.get("screen").width * 0.85

  const {
    name,
    logo,
    city,
    country,
    state,
    street,
    ratings,
    closingTime,
    openingTime,
  } = item

  const timeNow = new Date().getHours()
  const closingHour = parseInt(closingTime.split(":")[0], 10) + 12
  const openingHour = parseInt(openingTime.split(":")[0], 10)

  const isOpen = () => openingHour <= timeNow && timeNow < closingHour

  const isOpenText = () => (isOpen() ? "text-dark-green" : "text-red-color")
  const ratingText = () =>
    ratings && ratings > 3.0 ? "text-dark-green" : "text-red-color"

  return (
    <View className="relative mb-5 rounded-2xl bg-white">
      <Image
        className={`h-[235px] w-[${width}px] rounded-2xl`}
        source={{ uri: IMAGE_URL + logo }}
      />
      <View className="my-2 pl-2">
        <Text className="mb-1 font-bento-med capitalize text-dark">{name}</Text>
        <Text className="mb-1 font-bento-med text-xs capitalize text-grey">
          {street} {city}, {state}, {country}
        </Text>
        <Text className="mb-1 font-bento-med text-xs text-grey">10 km</Text>
      </View>
      <View className="absolute left-3 top-3 min-w-[70px] items-center justify-center rounded-lg bg-white p-2">
        <Text className={`font-bento-bold text-xs uppercase ${isOpenText()}`}>
          {isOpen() ? "open" : "closed"}
        </Text>
      </View>
      <View className=" absolute right-3 top-3 min-w-[70px] flex-row items-center justify-center rounded-lg bg-white p-2">
        <Image
          source={require("../../assets/images/icons/Star.png")}
          className="mr-2 h-[14px] w-[14px]"
          resizeMode="contain"
        />
        <Text className={`font-bento-bold text-xs ${ratingText()}`}>
          {ratings}
        </Text>
      </View>
    </View>
  )
}

export default RestaurantsCard
