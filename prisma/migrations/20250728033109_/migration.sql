/*
  Warnings:

  - You are about to drop the `chat_participants` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[project_id]` on the table `chats` will be added. If there are existing duplicate values, this will fail.
  - Made the column `project_id` on table `chats` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "chat_participants" DROP CONSTRAINT "chat_participants_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "chat_participants" DROP CONSTRAINT "chat_participants_user_id_fkey";

-- AlterTable
ALTER TABLE "chats" ALTER COLUMN "type" SET DEFAULT 'project',
ALTER COLUMN "project_id" SET NOT NULL;

-- DropTable
DROP TABLE "chat_participants";

-- CreateIndex
CREATE UNIQUE INDEX "chats_project_id_key" ON "chats"("project_id");
