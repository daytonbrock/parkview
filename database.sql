
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "clearance_level" INT NOT NULL DEFAULT 1
);

CREATE TABLE "park_reviews" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"body" VARCHAR NOT NULL,
	"park_name" VARCHAR NOT NULL,
	"clearance_level" INT NOT NULL DEFAULT 2
);

CREATE TABLE "images" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR NOT NULL,
	"url" VARCHAR NOT NULL,
	"review_id" INT REFERENCES "park_reviews" NOT NULL
);