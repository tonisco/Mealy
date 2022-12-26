/*
  Warnings:

  - You are about to drop the column `password` on the `Courier` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Courier" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";

-- CreateTable
CREATE TABLE "UserAuth" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "password" TEXT,
    "OTP" TEXT,

    CONSTRAINT "UserAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestaurantAuth" (
    "id" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "password" TEXT,
    "OTP" TEXT,

    CONSTRAINT "RestaurantAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourierAuth" (
    "id" TEXT NOT NULL,
    "courierId" TEXT NOT NULL,
    "password" TEXT,
    "OTP" TEXT,

    CONSTRAINT "CourierAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAuth_userId_key" ON "UserAuth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantAuth_restaurantId_key" ON "RestaurantAuth"("restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "CourierAuth_courierId_key" ON "CourierAuth"("courierId");

-- AddForeignKey
ALTER TABLE "UserAuth" ADD CONSTRAINT "UserAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantAuth" ADD CONSTRAINT "RestaurantAuth_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourierAuth" ADD CONSTRAINT "CourierAuth_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "Courier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
