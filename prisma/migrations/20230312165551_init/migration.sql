-- CreateTable
CREATE TABLE "users"
(
    "id"           TEXT         NOT NULL,
    "email"        TEXT         NOT NULL,
    "password"     TEXT         NOT NULL,
    "refreshToken" TEXT,
    "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "albums"
(
    "id"     SERIAL NOT NULL,
    "title"  TEXT   NOT NULL,
    "userId" TEXT,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos"
(
    "id"      SERIAL NOT NULL,
    "title"   TEXT   NOT NULL,
    "url"     TEXT   NOT NULL,
    "commnet" TEXT   NOT NULL,
    "userId"  TEXT,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AlbumToPhoto"
(
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users" ("email");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToPhoto_AB_unique" ON "_AlbumToPhoto" ("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToPhoto_B_index" ON "_AlbumToPhoto" ("B");

-- AddForeignKey
ALTER TABLE "albums"
    ADD CONSTRAINT "albums_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos"
    ADD CONSTRAINT "photos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToPhoto"
    ADD CONSTRAINT "_AlbumToPhoto_A_fkey" FOREIGN KEY ("A") REFERENCES "albums" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToPhoto"
    ADD CONSTRAINT "_AlbumToPhoto_B_fkey" FOREIGN KEY ("B") REFERENCES "photos" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
