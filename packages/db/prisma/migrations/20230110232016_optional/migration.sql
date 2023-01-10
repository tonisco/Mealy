/*
  Warnings:

  - Made the column `image` on table `Food` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discountPercentage` on table `Food` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discountPrice` on table `Food` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Food" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "discountPercentage" SET NOT NULL,
ALTER COLUMN "discountPrice" SET NOT NULL;
