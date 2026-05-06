CREATE TABLE "uploads" (
	"id" text PRIMARY KEY NOT NULL,
	"original_link" text NOT NULL,
	"short_link" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "uploads_original_link_unique" UNIQUE("original_link"),
	CONSTRAINT "uploads_short_link_unique" UNIQUE("short_link")
);
