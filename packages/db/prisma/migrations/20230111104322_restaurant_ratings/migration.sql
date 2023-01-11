-- CreateTable
CREATE TABLE "RestaurantRatings" (
    "id" TEXT NOT NULL,
    "comment" TEXT,
    "ratings" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RestaurantRatings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RestaurantToRestaurantRatings" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RestaurantRatingsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RestaurantToRestaurantRatings_AB_unique" ON "_RestaurantToRestaurantRatings"("A", "B");

-- CreateIndex
CREATE INDEX "_RestaurantToRestaurantRatings_B_index" ON "_RestaurantToRestaurantRatings"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RestaurantRatingsToUser_AB_unique" ON "_RestaurantRatingsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RestaurantRatingsToUser_B_index" ON "_RestaurantRatingsToUser"("B");

-- AddForeignKey
ALTER TABLE "_RestaurantToRestaurantRatings" ADD CONSTRAINT "_RestaurantToRestaurantRatings_A_fkey" FOREIGN KEY ("A") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RestaurantToRestaurantRatings" ADD CONSTRAINT "_RestaurantToRestaurantRatings_B_fkey" FOREIGN KEY ("B") REFERENCES "RestaurantRatings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RestaurantRatingsToUser" ADD CONSTRAINT "_RestaurantRatingsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "RestaurantRatings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RestaurantRatingsToUser" ADD CONSTRAINT "_RestaurantRatingsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
