/*
  Warnings:

  - The primary key for the `houses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "houses" DROP CONSTRAINT "houses_userId_fkey";

-- AlterTable
ALTER TABLE "houses" DROP CONSTRAINT "houses_pkey",
ALTER COLUMN "house_id" DROP DEFAULT,
ALTER COLUMN "house_id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "houses_pkey" PRIMARY KEY ("house_id");
DROP SEQUENCE "houses_house_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "user_id" DROP DEFAULT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("user_id");
DROP SEQUENCE "users_user_id_seq";

-- AddForeignKey
ALTER TABLE "houses" ADD CONSTRAINT "houses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
