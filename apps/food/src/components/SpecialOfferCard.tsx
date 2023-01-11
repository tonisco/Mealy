import { IMAGE_URL } from "@env"
import { Food, Restaurant } from "db/src/client"
import { GradientBackground } from "mobile-ui"
import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"

type Props = Food & {
  restaurant: Restaurant
  distanceInTime: number
}

const SpecialOfferCard = ({
  name,
  distanceInTime,
  image,
  restaurant,
  discountPercentage,
}: Props) => {
  return (
    <View className="mr-4 rounded-xl bg-white">
      <View className="relative mb-1 h-[140px] w-[145px] overflow-hidden rounded-xl">
        <Image className="h-full w-full" source={{ uri: IMAGE_URL + image }} />
        <GradientBackground style={style.gradientText}>
          <Text className="font-bento-bold text-xs capitalize text-white">
            {`${discountPercentage}`}% off
          </Text>
        </GradientBackground>
      </View>
      <Text className="mb-1 pl-2 font-bento-med text-sm capitalize text-dark">
        {name}
      </Text>
      <View className="mb-1 flex-row items-center pl-2">
        <Image
          source={require("../../assets/images/icons/Home1.png")}
          resizeMode="contain"
          className="mr-1 h-[14px] w-[14px]"
        />
        <Text className="font-bento-reg text-xs capitalize text-dark">
          {restaurant.name}
        </Text>
      </View>
      <View className="mb-1 flex-row items-center pl-2">
        <View className="mr-2 flex-row items-center">
          <Image
            source={require("../../assets/images/icons/Star.png")}
            resizeMode="contain"
            className="mr-1 h-[14px] w-[14px]"
          />
          <Text className="font-bento-reg text-xs text-dark">
            {restaurant.ratings}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Image
            source={require("../../assets/images/icons/Time.png")}
            resizeMode="contain"
            className="mr-1 h-[14px] w-[14px]"
          />
          <Text className="font-bento-reg text-xs text-lite-gray">
            {distanceInTime} mins
          </Text>
        </View>
      </View>
    </View>
  )
}

export default SpecialOfferCard

const style = StyleSheet.create({
  gradientText: {
    position: "absolute",
    left: 0,
    bottom: 0,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderTopRightRadius: 99,
    borderBottomRightRadius: 99,
  },
})
