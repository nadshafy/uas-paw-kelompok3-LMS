CREATE TABLE "Users" (
  "id" integer PRIMARY KEY,
  "email" varchar,
  "name" varchar,
  "password" varchar,
  "role" varchar
);

CREATE TABLE "Books" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "author" varchar,
  "ISBN" varchar UNIQUE,
  "category" varchar,
  "copies_available" integer,
  "copies_total" integer
);

CREATE TABLE "Borrowings" (
  "id" integer PRIMARY KEY,
  "member_id" integer,
  "book_id" integer,
  "borrow_date" date,
  "due_date" date,
  "return_date" date,
  "fine" decimal
);

CREATE TABLE "BookReservations" (
  "id" integer PRIMARY KEY,
  "member_id" integer,
  "book_id" integer,
  "reservation_date" date,
  "is_active" boolean
);

CREATE TABLE "Reviews" (
  "id" integer PRIMARY KEY,
  "member_id" integer,
  "book_id" integer,
  "rating" integer,
  "review_text" text,
  "review_date" date
);

ALTER TABLE "Borrowings" ADD FOREIGN KEY ("member_id") REFERENCES "Users" ("id");

ALTER TABLE "Borrowings" ADD FOREIGN KEY ("book_id") REFERENCES "Books" ("id");

ALTER TABLE "BookReservations" ADD FOREIGN KEY ("member_id") REFERENCES "Users" ("id");

ALTER TABLE "BookReservations" ADD FOREIGN KEY ("book_id") REFERENCES "Books" ("id");

ALTER TABLE "Reviews" ADD FOREIGN KEY ("member_id") REFERENCES "Users" ("id");

ALTER TABLE "Reviews" ADD FOREIGN KEY ("book_id") REFERENCES "Books" ("id");
