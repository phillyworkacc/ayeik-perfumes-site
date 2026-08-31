import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

export const db = drizzle({
   connection: process.env.NEON_DB!,
   ws,
});