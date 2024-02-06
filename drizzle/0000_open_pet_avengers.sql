-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `schema_migrations` (
	`version` numeric PRIMARY KEY
);
--> statement-breakpoint
CREATE TABLE `books` (
	`id` integer PRIMARY KEY,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`genre` text NOT NULL,
	`price` real NOT NULL
);

*/