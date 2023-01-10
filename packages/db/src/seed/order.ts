import { faker } from "@faker-js/faker"
import {
  prisma,
  Food,
  Restaurant,
  Order,
  User,
  Courier,
  randomItem,
  randomNumber,
  shuffleArray,
  subtractAYear,
} from "."

export const allOrders = async (
  restaurants: Restaurant[],
  couriers: Courier[],
  users: User[],
) => {
  const orders: Order[] = []

  // create orders
  await Promise.all(
    // loop through all restaurants created
    restaurants.map(async (restaurant) => {
      // create 100 orders
      return await Promise.all(
        Array.from({ length: 100 }, async () => {
          // add orders to database
          const order = await prisma.order.create({
            data: {
              isPaid: true,
              courierId: randomItem(couriers).id,
              restaurantId: restaurant.id,
              payment: randomItem(["Card", "Ondelivery"]),
              status: "Delivered",
              userId: randomItem(users).id,
              totalPrice: 0.0,
              created_at: faker.date.between(
                subtractAYear(new Date()),
                Date.now(),
              ),
            },
          })
          orders.push(order)
        }),
      )
    }),
  )
  return orders
}

export const allFoodOrdered = async (orders: Order[], foods: Food[]) => {
  // create food ordered in each order
  await Promise.all(
    orders.map(async (order) => {
      // random number of foods ordered per order
      const n = randomNumber(8)

      // Get all foods from a restaurant
      const foodFromRestaurant = foods.filter(
        (food) => food.restaurantId === order.restaurantId,
      )

      // shuffle the restaurant foods each order
      const restaurantFoods = shuffleArray(foodFromRestaurant)

      const orderItems = await Promise.all(
        Array.from({ length: n }, async (_, i) => {
          const food = restaurantFoods[i]

          // random number of that particular food ordered
          const numOfFood = randomNumber(3)

          // change price used if discount discount
          let priceUsed = food.price
          const discountPrice = food.discountPrice
          if (discountPrice && discountPrice > 0) priceUsed = discountPrice

          return await prisma.foodOrdered.create({
            data: {
              quantity: numOfFood,
              orderId: order.id,
              foodTotalPrice: numOfFood * priceUsed,
              orderDiscountPercentage: food.discountPercentage ?? 0,
              orderDiscountPrice: food.discountPrice ?? 0,
              orderPrice: food.price ?? 0,
              food: {
                connect: {
                  id: food.id,
                },
              },
            },
          })
        }),
      )
      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          totalPrice: orderItems.reduce(
            (prev, curr) => prev + curr.foodTotalPrice,
            0,
          ),
        },
      })
    }),
  )
}
