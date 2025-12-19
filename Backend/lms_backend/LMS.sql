CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "email" varchar,
  "name" varchar,
  "password" varchar,
  "role" varchar
);

CREATE TABLE "books" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "author" varchar,
  "ISBN" varchar UNIQUE,
  "category" varchar,
  "copies_available" integer,
  "copies_total" integer
);

CREATE TABLE "borrowings" (
  "id" integer PRIMARY KEY,
  "member_id" integer,
  "book_id" integer,
  "borrow_date" date,
  "due_date" date,
  "return_date" date,
  "fine" decimal
);

CREATE TABLE "bookreservations" (
  "id" integer PRIMARY KEY,
  "member_id" integer,
  "book_id" integer,
  "reservation_date" date,
  "is_active" boolean
);

CREATE TABLE "reviews" (
  "id" integer PRIMARY KEY,
  "member_id" integer,
  "book_id" integer,
  "rating" integer,
  "review_text" text,
  "review_date" date
);

ALTER TABLE "borrowings" ADD FOREIGN KEY ("member_id") REFERENCES "users" ("id");

ALTER TABLE "borrowings" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "bookreservations" ADD FOREIGN KEY ("member_id") REFERENCES "users" ("id");

ALTER TABLE "bookreservations" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("member_id") REFERENCES "users" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");
