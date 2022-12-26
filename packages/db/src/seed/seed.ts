import {
  shuffleAndReduce,
  allUsers,
  allCouriers,
  restaurantData,
  allRestaurants,
  allFood,
  allFoodOrdered,
  allOrders,
  clearData,
} from "."
import { encryptPassword } from "../encrypt"

import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  })

export * from "@prisma/client"

const create = async () => {
  const password = await encryptPassword("12345")

  const shuffleRestaurants = shuffleAndReduce(restaurantData, 5)
  console.time("Finished all seeding")

  console.time("Finished clearing database")
  await clearData()
  console.timeEnd("Finished clearing database")

  console.time("Finished creating all users")
  const users = await allUsers(password)
  console.timeEnd("Finished creating all users")

  console.time("Finished creating all couriers")
  const couriers = await allCouriers(password)
  console.timeEnd("Finished creating all couriers")

  console.time("Finished creating all restaurants")
  const restaurants = await allRestaurants(password, shuffleRestaurants)
  console.timeEnd("Finished creating all restaurants")

  console.time("Finished creating all restaurants foods")
  const foods = await allFood(restaurants)
  console.timeEnd("Finished creating all restaurants foods")

  console.time("Finished creating all restaurants orders")
  const orders = await allOrders(restaurants, couriers, users)
  console.timeEnd("Finished creating all restaurants orders")

  console.time("Finished adding foods to all orders")
  await allFoodOrdered(orders, foods)
  console.timeEnd("Finished adding foods to all orders")

  console.timeEnd("Finished all seeding")
}

create()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma?.$disconnect()
  })
