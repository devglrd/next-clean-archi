import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sessions, todos, users } from "./schema";

const client = createClient({
    url: process.env.DATABASE_URL ?? "file:sqlite.db",
    authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema: { users, sessions, todos } });

export const luciaAdapter = new DrizzleSQLiteAdapter(db, sessions, users);