-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "discountPercentage" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "discountPrice" DOUBLE PRECISION DEFAULT 0.0,
ALTER COLUMN "image" DROP NOT NULL;
