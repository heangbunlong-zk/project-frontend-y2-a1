/*
  Warnings:

  - Added the required column `duration` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lessons` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "track" TEXT NOT NULL,
    "mentor" TEXT NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "learners" INTEGER NOT NULL DEFAULT 0,
    "duration" TEXT NOT NULL,
    "lessons" TEXT NOT NULL,
    "outcomes" TEXT NOT NULL,
    "curriculum" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_courses" ("createdAt", "curriculum", "description", "id", "learners", "level", "mentor", "outcomes", "rating", "title", "track") SELECT "createdAt", "curriculum", "description", "id", "learners", "level", "mentor", "outcomes", "rating", "title", "track" FROM "courses";
DROP TABLE "courses";
ALTER TABLE "new_courses" RENAME TO "courses";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
