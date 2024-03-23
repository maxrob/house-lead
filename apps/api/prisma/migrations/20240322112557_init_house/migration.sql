-- CreateTable
CREATE TABLE "houses" (
    "house_id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "houses_pkey" PRIMARY KEY ("house_id")
);

-- AddForeignKey
ALTER TABLE "houses" ADD CONSTRAINT "houses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
