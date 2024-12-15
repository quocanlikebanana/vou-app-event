/*
  Warnings:

  - A unique constraint covering the columns `[userId,eventId]` on the table `User_Join_Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,eventId]` on the table `User_Like_Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `turnsPerDay` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `partnerId` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `turn` to the `User_Join_Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "turnsPerDay" INTEGER NOT NULL,
ALTER COLUMN "partnerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User_Join_Event" ADD COLUMN     "turn" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "StartInOneDay_Event" (
    "eventId" TEXT NOT NULL,
    "notificationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StartInOneDay_Event_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "StartNow_Event" (
    "eventId" TEXT NOT NULL,
    "notificationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StartNow_Event_pkey" PRIMARY KEY ("eventId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Join_Event_userId_eventId_key" ON "User_Join_Event"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "User_Like_Event_userId_eventId_key" ON "User_Like_Event"("userId", "eventId");
