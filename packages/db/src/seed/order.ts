import { faker } from '@faker-js/faker'
import { prisma, Food, Restaurant, Order, User, Courier, randomItem, randomNumber, shuffleArray } from '.'

export const allOrders = async (restaurants: Restaurant[], couriers: Courier[], users: User[]) => {
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
                            payment: randomItem(['Card', 'Ondelivery']),
                            status: 'Delivered',
                            userId: randomItem(users).id,
                            totalPrice: 0.0,
                            created_at: faker.date.between(new Date(2022, 1, 1, 0, 0, 0), Date.now()),
                        }
                    })
                    orders.push(order)
                })
            )

        })
    )
    return orders
}

export const allFoodOrdered = async (orders: Order[], foods: Food[]) => {

    // create food ordered in each order
    await Promise.all(
        orders.map(async (order) => {

            // random number of food ordered per order
            const n = randomNumber(8)

            // shuffle the restaurant food each time
            const foodFromRestaurant = foods.filter((food) => food.restaurantId === order.restaurantId)
            const restaurantFoods = shuffleArray(foodFromRestaurant)
            const orderItems = await Promise.all(
                Array.from({ length: n }, async (_, i) => {

                    // random number of that particular food ordered
                    const numOfFood = randomNumber(3)
                    return await prisma.foodOrdered.create({
                        data: {
                            quantity: numOfFood,
                            orderId: order.id,
                            foodTotalPrice: numOfFood * restaurantFoods[i].price,
                            food: {
                                connect: {
                                    id: restaurantFoods[i].id
                                }
                            },
                        }
                    })
                })
            )
            await prisma.order.update({
                where: {
                    id: order.id
                },
                data: {
                    totalPrice: orderItems.reduce((prev, curr) => prev + curr.foodTotalPrice, 0)
                }
            })
        })
    )
}