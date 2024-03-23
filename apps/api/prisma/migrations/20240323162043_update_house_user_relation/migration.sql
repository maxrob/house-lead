/*
  Warnings:

  - You are about to drop the column `userId` on the `houses` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `houses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "houses" DROP CONSTRAINT "houses_userId_fkey";

-- AlterTable
ALTER TABLE "houses" DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "houseId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "houses"("house_id") ON DELETE SET NULL ON UPDATE CASCADE;
