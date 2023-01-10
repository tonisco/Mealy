import { router } from "../../trpc"
import { loggedInProcedure } from "../../trpc/middleware"

export const mainRouter = router({
  specialOffers: loggedInProcedure.query(async ({ ctx }) => {
    const { prisma, user } = ctx

    const { country, state } = user

    const offers = await prisma.food.findMany({
      where: {
        discountPercentage: { gt: 0 },
        restaurant: { country, state },
      },
      orderBy: { discountPercentage: "desc", discountPrice: "desc" },
      take: 5,
      include: { restaurant: true },
    })

    return offers
  }),

  allRestaurants: loggedInProcedure.query(async ({ ctx }) => {
    const { prisma, user } = ctx

    const { country, state } = user

    const restaurants = await prisma.user.findMany({
      where: { country, state },
    })

    return restaurants
  }),
})
