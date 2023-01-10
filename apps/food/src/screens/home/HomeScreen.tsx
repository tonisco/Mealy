import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { Dimensions, FlatList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { trpc } from "trpc-client"

import AddessInput from "../../components/AddessInput"
import SearchBar from "../../components/SearchBar"
import SpecialOffers from "../../components/SpecialOffers"
import { HomeScreenType, MainScreenType } from "../../screenTypes/home"

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeScreenType, "Home">,
  BottomTabScreenProps<MainScreenType>
>

const dummyData = [
  {
    name: "Salad dish",
    image: require("../../../assets/image1.png"),
    restaurant: "the way restaurant",
    rating: 4.5,
    distanceInTime: 10,
  },
  {
    name: "Main dish",
    image: require("../../../assets/image2.png"),
    restaurant: "lobby way",
    rating: 3.5,
    distanceInTime: 12,
  },
  {
    name: "tasty top",
    image: require("../../../assets/image3.png"),
    restaurant: "the way restaurant",
    rating: 4.0,
    distanceInTime: 13,
  },
]

const HomeScreen = (props: Props) => {
  const paddingHorizontal = (Dimensions.get("screen").width * 0.15) / 2

  const [allRestaurants, specialOffers] = trpc.useQueries((t) => [
    t.food.main.allRestaurants(),
    t.food.main.specialOffers(),
  ])

  return (
    <SafeAreaView
      className="flex-1 bg-zinc-50 pt-4"
      style={{ paddingHorizontal }}
    >
      <SearchBar
        showFilterIcon
        navigate={() => props.navigation.jumpTo("Search")}
      />
      <View className="mt-5">
        <AddessInput />
      </View>

      <View className="mt-5">
        <Text className="mb-2 font-bento-bold text-xl capitalize">
          Special offers
        </Text>
        {!specialOffers.isLoading && (
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={specialOffers.data}
            renderItem={({ item }) => (
              <SpecialOffers {...item} distanceInTime={10} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
