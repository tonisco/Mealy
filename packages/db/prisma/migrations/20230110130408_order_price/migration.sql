/*
  Warnings:

  - Added the required column `orderDiscountPercentage` to the `FoodOrdered` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderDiscountPrice` to the `FoodOrdered` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderPrice` to the `FoodOrdered` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodOrdered" ADD COLUMN     "orderDiscountPercentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "orderDiscountPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "orderPrice" DOUBLE PRECISION NOT NULL;
