import { User, Game } from "@prisma/client";

export type { User, Game };

export interface GoogleUserResult {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  verified_email: boolean;
  at_hash: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  iat: number;
  exp: number;
}
