import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
  server: {
    SECRET_KEY: z.string().min(1),
    CORS_ORIGIN: z.string().url(),
    REDIS_URL: z.string().url(),
  },
  runtimeEnvStrict: {
    SECRET_KEY: process.env.SECRET_KEY,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    REDIS_URL: process.env.REDIS_URL,
  },
});
