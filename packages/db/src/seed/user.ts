import { faker } from "@faker-js/faker"
import { prisma, User } from "."

export const allUsers = async (password: string): Promise<User[]> =>
  await Promise.all(
    Array.from({ length: 20 }, async () => {
      const first_name = faker.name.firstName()
      const last_name = faker.name.lastName()
      const user = await prisma.user.create({
        data: {
          fullName: `${first_name} ${last_name}`,
          email: faker.internet.email(first_name, last_name).toLowerCase(),
          city: "Ikeja",
          country: "Nigeria",
          phone: faker.phone.number(),
          state: "Lagos",
          street: faker.address.streetAddress(),
          lat: faker.address.latitude(),
          lng: faker.address.longitude(),
          userAuth: {
            create: {
              password,
            },
          },
        },
      })
      return user
    }),
  )
