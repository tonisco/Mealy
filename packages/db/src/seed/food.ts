import { prisma, Food, Restaurant, drink, meal, shuffleAndReduce } from "."

export const allFood = async (restaurants: Restaurant[]) => {
  const foods: Food[] = []

  // create foods
  await Promise.all(
    // loop through all restaurants
    restaurants.map(async (restaurant) => {
      // llst all foods and drinks
      const restaurantFoods = [
        ...shuffleAndReduce(meal, 10),
        ...shuffleAndReduce(drink, 5),
      ]

      await Promise.all(
        // add all foods and drinks to data base
        restaurantFoods.map(async (restaurantFood) => {
          const { description, image, name, price, type } = restaurantFood
          const food = await prisma.food.create({
            data: {
              description,
              image,
              name,
              price,
              type,
              restaurantId: restaurant.id,
              created_at: new Date(2022, 1, 1, 0, 0, 0),
            },
          })
          foods.push(food)
        }),
      )
    }),
  )
  return foods
}
