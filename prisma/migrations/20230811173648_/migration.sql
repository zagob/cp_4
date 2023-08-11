-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Point" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "time1" INTEGER NOT NULL,
    "time2" INTEGER NOT NULL,
    "time3" INTEGER NOT NULL,
    "time4" INTEGER NOT NULL,
    "holiday" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Point" ("createdAt", "holiday", "id", "time1", "time2", "time3", "time4", "updatedAt") SELECT "createdAt", "holiday", "id", "time1", "time2", "time3", "time4", "updatedAt" FROM "Point";
DROP TABLE "Point";
ALTER TABLE "new_Point" RENAME TO "Point";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
