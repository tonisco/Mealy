import {prisma} from '.'

export const clearData = async () => {
    await prisma.restaurant.deleteMany({})
    await prisma.courier.deleteMany({})
    await prisma.user.deleteMany({})
}