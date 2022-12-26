-- AlterTable
ALTER TABLE "CourierAuth" ADD COLUMN     "OTPExpires" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "RestaurantAuth" ADD COLUMN     "OTPExpires" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "UserAuth" ADD COLUMN     "OTPExpires" TIMESTAMP(3);
