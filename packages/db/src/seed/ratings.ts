import {
  averageRestaurantRating,
  prisma,
  randomFloatBy2_5,
  randomNumber1N0,
  Restaurant,
  User,
} from "."
import { faker } from "@faker-js/faker"

export const allUserRatings = async (
  users: User[],
  restaurants: Restaurant[],
) => {
  await Promise.all(
    users.map(async (user) => {
      await Promise.all(
        restaurants.map(async (restaurant) => {
          const showComment = randomNumber1N0()

          let comment
          if (showComment) comment = faker.lorem.sentence()

          await prisma.restaurantRatings.create({
            data: {
              user: { connect: { id: user.id } },
              restaurant: { connect: { id: restaurant.id } },
              ratings: randomFloatBy2_5(),
              comment,
            },
          })
        }),
      )
    }),
  )
}

export const allRatings = async () => {
  const restaurants = await prisma.restaurant.findMany({
    include: { userRatings: true },
  })

  await Promise.all(
    restaurants.map(async (restaurant) => {
      await prisma.restaurant.update({
        where: { id: restaurant.id },
        data: { ratings: averageRestaurantRating(restaurant.userRatings) },
      })
    }),
  )
}
