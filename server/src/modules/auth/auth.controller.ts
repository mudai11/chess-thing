import { FastifyReply, FastifyRequest } from "fastify";
import {
  createGoogleUser,
  findUserByEmail,
  getAuthenticatedUser,
} from "./auth.service";
import { app } from "../../main";
import { GoogleUserResult } from "src/types";
import { randomUsername } from "../../utils/randomusername";
import { env } from "../../../env";

async function authenticateUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const token = request.cookies["session.access.token"];
    if (!token) {
      return reply.status(401).send({
        error: "You're not logged in.",
      });
    }
    const decoded: {
      id: string;
      iat: string;
    } | null = app.jwt.decode(token);
    if (!decoded) {
      return reply.status(400).send({
        error: "Access token is invalid.",
      });
    }

    const id = decoded.id;
    const user = await getAuthenticatedUser(id);
    if (!user) {
      return reply.status(400).send({
        error: "Token does not associate to any user.",
      });
    }

    return reply.status(200).send(user);
  } catch (e) {
    return reply.status(500).send({
      error: "Could not authenticate you right now, try again later.",
    });
  }
}

export async function googleAuthHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { token } =
      await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

    const id_token = token.id_token!;
    const google_user: GoogleUserResult = app.jwt.decode(id_token)!;
    const username = await randomUsername(google_user.email);
    const new_user = {
      username: username,
      email: google_user.email,
      image: google_user.picture,
    };
    const user = await findUserByEmail(google_user.email);
    let access_token: string;
    if (!user) {
      const created_user = await createGoogleUser(new_user);
      access_token = app.jwt.sign({ id: created_user.id });
    } else {
      access_token = app.jwt.sign({ id: user.id });
    }

    return reply
      .setCookie("session.access.token", access_token, {
        path: "/",
        httpOnly: true,
        secure: true,
        maxAge: 10 * 24 * 60 * 60,
        sameSite: "none",
        domain: ".railway.app",
      })
      .redirect(env.ORIGIN);
  } catch (e) {
    return reply.redirect(env.ORIGIN).status(500).send({
      error: "Could not authenticate you right now, try again later.",
    });
  }
}

export { authenticateUserHandler };
