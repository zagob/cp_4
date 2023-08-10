-- CreateTable
CREATE TABLE "InfoPoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start1" INTEGER NOT NULL,
    "exit1" INTEGER NOT NULL,
    "start2" INTEGER NOT NULL,
    "exit2" INTEGER NOT NULL,
    "totalMinutes" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Point" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "time1" INTEGER NOT NULL,
    "time2" INTEGER NOT NULL,
    "time3" INTEGER NOT NULL,
    "time4" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
