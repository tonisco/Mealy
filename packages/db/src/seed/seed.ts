import { shuffleAndReduce, allUsers, allCouriers, restaurantData, allRestaurants, allFood, allFoodOrdered, allOrders, clearData } from '.'
import { encryptPassword } from '../encrypt'

import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient({
    log: process.env.NODE_ENV === 'development' ?
        ['query', 'error', 'warn']
        : ['error']
})

export * from "@prisma/client"

const create = async () => {
    const password = await encryptPassword('12345')

    const shuffleRestaurants = shuffleAndReduce(restaurantData, 5)

    await clearData()

    const users = await allUsers(password)

    const couriers = await allCouriers(password)

    const restaurants = await allRestaurants(password, shuffleRestaurants)

    const foods = await allFood(restaurants)

    const orders = await allOrders(restaurants, couriers, users)

    await allFoodOrdered(orders, foods,)

}

create().catch(e => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma?.$disconnect()
})