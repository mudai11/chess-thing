import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  createUser,
  findUserById,
  findUserByUsername,
  getAuthenticatedUser,
  getUsers,
  updateUserEmail,
  updateUserPassword,
  updateUserUsername,
} from "./user.service";
import {
  CreateUserSchema,
  SigninUserSchema,
  UpdateUserSchema,
} from "./user.schema";
import { app } from "../../main";
import { Prisma } from "@prisma/client";

async function createUserHandler(
  request: FastifyRequest<{ Body: CreateUserSchema }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);
    const { id } = user;
    const token = app.jwt.sign({ id: id });

    return reply
      .status(201)
      .setCookie("accessToken", token, {
        path: "/",
        httpOnly: true,
        secure: true,
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
    return reply.status(500).send(e);
  }
}

async function getUsersHandler(_: FastifyRequest, reply: FastifyReply) {
  try {
    const users = await getUsers();
    return reply.status(200).send(users);
  } catch (e) {
    console.log(e);
    return reply.status(500).send(e);
  }
}

async function signinUserHandler(
  request: FastifyRequest<{ Body: SigninUserSchema }>,
  reply: FastifyReply
) {
  const body = request.body;

  const user = await findUserByUsername(body.username);
  if (!user) {
    return reply.status(401).send({
      error: "Invalid username or password",
    });
  }

  const isMatch = await bcrypt.compare(body.password, user.password);
  if (!isMatch) {
    return reply.status(401).send({
      error: "Invalid username or password",
    });
  }

  const { id } = user;
  const token = app.jwt.sign({ id: id });

  return reply
    .status(200)
    .setCookie("accessToken", token, {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 10 * 24 * 60 * 60,
    })
    .send({ message: "Success" });
}

async function updateUserHandler(
  request: FastifyRequest<{
    Body: UpdateUserSchema;
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
  if (body.email) {
    if (body.email.toLocaleLowerCase() === user.email.toLocaleLowerCase()) {
      return reply.status(400).send({
        error: "Your new email cannot be your old email",
      });
    }
    try {
      await updateUserEmail(id, body.email);
      return reply.status(200).send({
        message: "Success",
      });
    } catch (e) {
      console.log(e);
      return reply.status(500).send(e);
    }
  }
  if (body.username) {
    if (
      body.username.toLocaleLowerCase() === user.username.toLocaleLowerCase()
    ) {
      return reply.status(400).send({
        error: "Your new username cannot be your old username",
      });
    }
    try {
      await updateUserUsername(id, body.username);
      return reply.status(200).send({
        message: "Success",
      });
    } catch (e) {
      console.log(e);
      return reply.status(500).send(e);
    }
  }
  if (body.password) {
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (isMatch) {
      return reply.status(400).send({
        error: "Your new password cannot be your old password",
      });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password, salt);
      await updateUserPassword(id, hashedPassword);
      return reply.status(200).send({
        message: "Success",
      });
    } catch (e) {
      console.log(e);
      return reply.status(500).send(e);
    }
  }

  return reply.status(400).send({
    error: "Bad request",
  });
}

async function authenticateUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
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
  const user = await getAuthenticatedUser(id);
  if (!user) {
    return reply.status(400).send({
      error: "Token does not associate to any user.",
    });
  }

  return reply.status(200).send(user);
}

async function deleteSessionHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
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
  const user = await getAuthenticatedUser(id);
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
      secure: true,
      maxAge: 0,
    })
    .send({ message: "Success" });
}

export {
  createUserHandler,
  getUsersHandler,
  signinUserHandler,
  updateUserHandler,
  authenticateUserHandler,
  deleteSessionHandler,
};
