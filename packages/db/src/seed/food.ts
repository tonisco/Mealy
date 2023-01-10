import {
  prisma,
  Food,
  Restaurant,
  drink,
  meal,
  shuffleAndReduce,
  randomNumber,
  randomItem,
} from "."

export const allFood = async (restaurants: Restaurant[]) => {
  const foods: Food[] = []

  const discountPercentages = [5, 10, 15, 20, 25, 30, 35, 40]

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

          let discountPercentage = 0
          let discountPrice = 0

          const addDiscount = randomNumber() === 1
          if (addDiscount) {
            const discountPercent = randomItem(discountPercentages)
            discountPercentage = discountPercent
            const discount = parseFloat(
              (price * (discountPercent / 100)).toFixed(2),
            )
            console.log(discount)
            discountPrice = price - discount
          }

          const food = await prisma.food.create({
            data: {
              description,
              image,
              name,
              price,
              type,
              restaurantId: restaurant.id,
              discountPercentage,
              discountPrice,
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
