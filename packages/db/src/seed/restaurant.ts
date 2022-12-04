import { faker } from "@faker-js/faker"
import { prisma, Restaurant } from '.'


export const allRestaurants = async (password: string, shuffleRestaurants: Array<{ name: string, logo: string }>): Promise<Restaurant[]> => await Promise.all(
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