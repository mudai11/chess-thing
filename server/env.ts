import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
  server: {
    HOST: z.string().min(1),
    PORT: z.string().min(1),
    SECRET_KEY: z.string().min(1),
    ORIGIN: z.string().url(),
    SERVER_URL: z.string().url(),
    REDIS_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GOOGLE_OAUTH_REDIRECT_URL: z.string().min(1),
  },
  runtimeEnv: {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    ORIGIN: process.env.ORIGIN,
    SERVER_URL: process.env.SERVER_URL,
    REDIS_URL: process.env.REDIS_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_OAUTH_REDIRECT_URL: process.env.GOOGLE_OAUTH_REDIRECT_URL,
  },
});
