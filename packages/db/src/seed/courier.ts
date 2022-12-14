import { faker } from "@faker-js/faker"
import { prisma, Courier, subtractAYear } from "."

export const allCouriers = async (password: string): Promise<Courier[]> =>
  await Promise.all(
    Array.from({ length: 5 }, async () => {
      const name = faker.name.fullName()
      const courier = await prisma.courier.create({
        data: {
          city: "Ikeja",
          country: "Nigeria",
          state: "Lagos",
          street: faker.address.streetAddress(),
          phone: faker.phone.number(),
          fullName: name,
          email: faker.internet.email(name),
          created_at: subtractAYear(new Date()),
          courierAuth: { create: { password } },
        },
      })
      return courier
    }),
  )
