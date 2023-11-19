import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  createUser,
  deleteUser,
  findUserById,
  findUserByUsername,
  getUsers,
  updateUserEmail,
  updateUserPassword,
  updateUserUsername,
} from "./user.service";
import {
  CreateUserSchema,
  SigninUserSchema,
  UpdateUserPasswordSchema,
  UserEmailSchema,
  UserUsernameSchema,
  updateUserPasswordSchema,
} from "./user.schema";
import { app } from "../../main";
import { Prisma } from "@prisma/client";
import { DeleteGameSchema } from "../game/game.schema";
import { ZodError } from "zod";

async function createUserHandler(
  request: FastifyRequest<{ Body: CreateUserSchema }>,
  reply: FastifyReply
) {
  try {
    const body = request.body;
    const user = await createUser(body);
    const { id } = user;
    const token = app.jwt.sign({ id: id });

    return reply
      .status(201)
      .setCookie("accessToken", token, {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 10 * 24 * 60 * 60,
      })
      .send({
        message: "Success",
      });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return reply
          .status(409)
          .send({ error: "The email or username is already taken." });
      }
    }
    return reply
      .status(500)
      .send({ error: "Could not sign you up right now, try again later." });
  }
}

async function getUsersHandler(_: FastifyRequest, reply: FastifyReply) {
  try {
    const users = await getUsers();
    return reply.status(200).send(users);
  } catch (e) {
    console.log(e);
    return reply
      .status(500)
      .send({ error: "Could not get users right now, try again later." });
  }
}

async function signinUserHandler(
  request: FastifyRequest<{ Body: SigninUserSchema }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await findUserByUsername(body.username);
    if (!user) {
      return reply.status(401).send({
        error: "Invalid username or password.",
      });
    }

    const isMatch = await bcrypt.compare(body.password, user.password!);
    if (!isMatch) {
      return reply.status(401).send({
        error: "Invalid username or password.",
      });
    }

    const { id } = user;
    const token = app.jwt.sign({ id: id });

    return reply
      .status(200)
      .setCookie("accessToken", token, {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 10 * 24 * 60 * 60,
      })
      .send({ message: "Success" });
  } catch (e) {
    return reply
      .status(500)
      .send({ error: "Could not sign you in right now, try again later." });
  }
}

async function updateUserUsernameHandler(
  request: FastifyRequest<{
    Body: UserUsernameSchema;
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  const token = request.cookies["accessToken"];
  if (!token) {
    return reply.status(401).send({
      error: "Unauthorized.",
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
  const user = await findUserById(id);

  if (!user) {
    return reply.status(400).send({
      error: "Token does not associate to any user.",
    });
  }

  if (body.username.toLocaleLowerCase() === user.username.toLocaleLowerCase()) {
    return reply.status(400).send({
      error: "Your new username cannot be your old username.",
    });
  }

  try {
    await updateUserUsername(id, body.username);
    return reply.status(200).send({
      message: "Success",
    });
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return reply
          .status(409)
          .send({ error: "The username is already taken." });
      }
    }
    return reply
      .status(500)
      .send({ error: "Could not update username right now, try again later." });
  }
}

async function updateUserEmailHandler(
  request: FastifyRequest<{
    Body: UserEmailSchema;
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  const token = request.cookies["accessToken"];
  if (!token) {
    return reply.status(401).send({
      error: "Unauthorized.",
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
  const user = await findUserById(id);

  if (!user) {
    return reply.status(400).send({
      error: "Token does not associate to any user.",
    });
  }

  if (body.email.toLocaleLowerCase() === user.email.toLocaleLowerCase()) {
    return reply.status(400).send({
      error: "Your new email cannot be your old email.",
    });
  }
  try {
    await updateUserEmail(id, body.email);
    return reply.status(200).send({
      message: "Success",
    });
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return reply.status(409).send({ error: "The email is already taken." });
      }
    }
    return reply
      .status(500)
      .send({ error: "Could not update email right now, try again later." });
  }
}

async function updateUserPasswordHandler(
  request: FastifyRequest<{
    Body: UpdateUserPasswordSchema;
  }>,
  reply: FastifyReply
) {
  try {
    const body = request.body;
    updateUserPasswordSchema.parse(body);
    const token = request.cookies["accessToken"];
    if (!token) {
      return reply.status(401).send({
        error: "Unauthorized.",
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
    const user = await findUserById(id);

    if (!user) {
      return reply.status(400).send({
        error: "Token does not associate to any user.",
      });
    }
    const isValid = await bcrypt.compare(body.old_password, user.password!);
    if (!isValid) {
      return reply.status(401).send({
        error: "Your old password is incorrect.",
      });
    }
    const isMatch = await bcrypt.compare(body.new_password, user.password!);
    if (isMatch) {
      return reply.status(400).send({
        error: "Your new password cannot be your old password.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.new_password, salt);
    await updateUserPassword(id, hashedPassword);
    return reply.status(200).send({
      message: "Success",
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return reply.status(422).send({ error: e.errors[0].message });
    }
    return reply
      .status(500)
      .send({ error: "Could not update password right now, try again later." });
  }
}

async function deleteSessionHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const token = request.cookies["accessToken"];
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
    const user = await findUserById(id);
    if (!user) {
      return reply.status(400).send({
        error: "Token does not associate to any user.",
      });
    }

    return reply
      .status(200)
      .setCookie("accessToken", "", {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 0,
      })
      .send({ message: "Success" });
  } catch (e) {
    return reply
      .status(500)
      .send({ error: "Could not sign you out right now, try again later." });
  }
}

async function deleteUserHandler(
  request: FastifyRequest<{
    Body: DeleteGameSchema;
  }>,
  reply: FastifyReply
) {
  try {
    const id = request.body.id;
    await deleteUser(id);
    return reply.status(200).send({
      message: "Success",
    });
  } catch (e) {
    return reply
      .status(500)
      .send({ error: "Could not delete user right now, try again later." });
  }
}

export {
  createUserHandler,
  getUsersHandler,
  signinUserHandler,
  updateUserUsernameHandler,
  updateUserEmailHandler,
  updateUserPasswordHandler,
  deleteSessionHandler,
  deleteUserHandler,
};
