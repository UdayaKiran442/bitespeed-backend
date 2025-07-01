CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar,
	"phone" varchar,
	"linked_id" integer,
	"link_precedence" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
