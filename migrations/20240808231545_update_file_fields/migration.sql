-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "edition" INTEGER NOT NULL DEFAULT 1,
    "author" TEXT,
    "gender" TEXT,
    "quantity" INTEGER DEFAULT 0,
    "price" INTEGER DEFAULT 0,
    "image_filesize" INTEGER,
    "image_filename" TEXT,
    "publisher" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT DEFAULT 'CLIENT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "biography" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buy" (
    "id" TEXT NOT NULL,
    "cliente" TEXT,
    "libro" TEXT,
    "fechaCompra" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cantidad" INTEGER NOT NULL DEFAULT 1,
    "estadoEnvio" TEXT DEFAULT 'PENDIENTE',
    "direccionEnvio" TEXT NOT NULL DEFAULT '',
    "codigoPostal" TEXT NOT NULL DEFAULT '',
    "ciudad" TEXT NOT NULL DEFAULT '',
    "telefono" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Buy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gender" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "image_filesize" INTEGER,
    "image_filename" TEXT,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "contact" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "book" TEXT,
    "user" TEXT,
    "status" TEXT DEFAULT 'PENDING',
    "reservationDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "sucursal" TEXT,
    "cantidad" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "book" TEXT,
    "user" TEXT,
    "rating" INTEGER DEFAULT 0,
    "comment" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sucursal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "postal" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Sucursal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Book_author_idx" ON "Book"("author");

-- CreateIndex
CREATE INDEX "Book_gender_idx" ON "Book"("gender");

-- CreateIndex
CREATE INDEX "Book_publisher_idx" ON "Book"("publisher");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Buy_cliente_idx" ON "Buy"("cliente");

-- CreateIndex
CREATE INDEX "Buy_libro_idx" ON "Buy"("libro");

-- CreateIndex
CREATE INDEX "Reservation_book_idx" ON "Reservation"("book");

-- CreateIndex
CREATE INDEX "Reservation_user_idx" ON "Reservation"("user");

-- CreateIndex
CREATE INDEX "Reservation_sucursal_idx" ON "Reservation"("sucursal");

-- CreateIndex
CREATE INDEX "Review_book_idx" ON "Review"("book");

-- CreateIndex
CREATE INDEX "Review_user_idx" ON "Review"("user");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_author_fkey" FOREIGN KEY ("author") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_gender_fkey" FOREIGN KEY ("gender") REFERENCES "Gender"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_publisher_fkey" FOREIGN KEY ("publisher") REFERENCES "Publisher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buy" ADD CONSTRAINT "Buy_cliente_fkey" FOREIGN KEY ("cliente") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buy" ADD CONSTRAINT "Buy_libro_fkey" FOREIGN KEY ("libro") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_book_fkey" FOREIGN KEY ("book") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_sucursal_fkey" FOREIGN KEY ("sucursal") REFERENCES "Sucursal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_book_fkey" FOREIGN KEY ("book") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
