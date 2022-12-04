import { PrismaClient } from '@prisma/client'
import { Order, Food } from '..'
import { faker } from '@faker-js/faker'
import { shuffleAndReduce, randomItem, randomNumber, shuffleArray } from './utils'
import { meal, drink, restaurantData } from './data'
import { encryptPassword } from '../encrypt'


const prisma = global.prisma || new PrismaClient({
    log: process.env.NODE_ENV === 'development' ?
        ['query', 'error', 'warn']
        : ['error']
})

const clearData = async () => {
    await prisma.restaurant.deleteMany({})
    await prisma.courier.deleteMany({})
    await prisma.user.deleteMany({})
}


const create = async () => {
    const password = await encryptPassword('12345')

    await clearData()

    const users = await Promise.all(
        Array.from({ length: 20 }, async () => {
            const first_name = faker.name.firstName()
            const last_name = faker.name.lastName()
            const user = await prisma.user.create({
                data: {
                    fullName: `${first_name} ${last_name}`,
                    email: faker.internet.email(first_name, last_name),
                    city: 'Ikeja',
                    country: 'Nigeria',
                    password: password,
                    phone: faker.phone.number(),
                    state: 'Lagos',
                    street: faker.address.streetAddress(),
                    lat: faker.address.latitude(),
                    lng: faker.address.longitude()
                }
            })
            return user
        })
    )

    const couriers = await Promise.all(
        Array.from({ length: 5 }, async () => {
            const name = faker.name.fullName()
            const courier = await prisma.courier.create({
                data: {
                    city: 'Ikeja',
                    country: 'Nigeria',
                    password: password,
                    state: 'Lagos',
                    street: faker.address.streetAddress(),
                    phone: faker.phone.number(),
                    fullName: name,
                    email: faker.internet.email(name),
                    created_at: new Date(2022, 1, 1, 0, 0, 0)
                }
            })
            return courier
        })
    )

    const shuffleRestaurants = shuffleAndReduce(restaurantData, 5)
    const restaurants = await Promise.all(
        Array.from({ length: 5 }, async (_, i) => {
            const restaurant = await prisma.restaurant.create({
                data: {
                    name: shuffleRestaurants[i].name,
                    city: 'Ikeja',
                    country: 'Nigeria',
                    password: password,
                    state: 'Lagos',
                    street: faker.address.streetAddress(),
                    phone: faker.phone.number(),
                    userFullName: faker.name.fullName(),
                    closingTime: '05:00 PM',
                    openingTime: '09:00 PM',
                    ratings: 0.0,
                    email: faker.internet.email(shuffleRestaurants[i].name),
                    lat: faker.address.latitude(),
                    lng: faker.address.longitude(),
                    logo: shuffleRestaurants[i].logo,
                    created_at: new Date(2022, 1, 1, 0, 0, 0),
                }
            })
            return restaurant
        })
    )

    const allfood: Food[] = []

    // create foods
    await Promise.all(

        // loop through all restaurants
        restaurants.map(async (restaurant) => {

            // llst all foods and drinks
            const restaurantFoods = [...shuffleAndReduce(meal, 10), ...shuffleAndReduce(drink, 5)]

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
                        }
                    })
                    allfood.push(food)
                })
            )
        })
    )

    const orders: Order[] = []

    // create orders
    await Promise.all(

        // loop through all restaurants created
        restaurants.map(async (restaurant) => {

            // create 80 orders
            return await Promise.all(
                Array.from({ length: 80 }, async () => {

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



    // create food ordered in each order
    await Promise.all(
        orders.map(async (order) => {

            // random number of food ordered per order
            const n = randomNumber(8)

            // shuffle the restaurant food each time
            const foodFromRestaurant = allfood.filter((food) => food.restaurantId === order.restaurantId)
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

create()