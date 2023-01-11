import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { Dimensions, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { trpc } from "trpc-client"

import AddessInput from "../../../components/AddessInput"
import SearchBar from "../../../components/SearchBar"
import Wrapper from "../../../components/Wrapper"
import { HomeScreenType, MainScreenType } from "../../../screenTypes/home"
import Restaurants from "./Restaurants"
import SpecialOffers from "./SpecialOffers"

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeScreenType, "Home">,
  BottomTabScreenProps<MainScreenType>
>

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
      <Wrapper>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <SearchBar
            showFilterIcon
            navigate={() => props.navigation.jumpTo("Search")}
          />
          <View className="mt-5">
            <AddessInput />
          </View>

          <View className="mt-5">
            <Text className="mb-3 font-bento-bold text-xl capitalize">
              Special offers
            </Text>
            <SpecialOffers
              data={specialOffers.data}
              isLoading={specialOffers.isLoading}
            />
          </View>
          <View className="mt-5">
            <Text className="mb-3 font-bento-bold text-xl capitalize">
              popular Restaurants
            </Text>
            <Restaurants
              isLoading={allRestaurants.isLoading}
              data={allRestaurants.data}
            />
          </View>
        </ScrollView>
      </Wrapper>
    </SafeAreaView>
  )
}

export default HomeScreen
