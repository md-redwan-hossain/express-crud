import type { Config } from "drizzle-kit";

export default {
  schema: "./src/shared/drizzle/schema.ts",
  out: "./src/shared/drizzle",
  driver: "better-sqlite",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: "./db.sqlite3"
  },
  introspect: {
    casing: "preserve"
  }
} satisfies Config;
