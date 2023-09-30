import { db } from "../../utils/db";
import { CreateUserSchema } from "./user.schema";
import bcrypt from "bcrypt";

async function createUser(data: CreateUserSchema) {
  const { password } = data;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return await db.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
}

async function getUsers() {
  return await db.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      image: true,
    },
  });
}

async function findUserByUsername(username: string) {
  return await db.user.findUnique({
    where: {
      username,
    },
  });
}

async function findUserById(id: string) {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
}

async function updateUserEmail(id: string, email: string) {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      email,
    },
  });
}

async function updateUserUsername(id: string, username: string) {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      username,
    },
  });
}

async function updateUserPassword(id: string, password: string) {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      password,
    },
  });
}

async function getAuthenticatedUser(id: string) {
  return await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      emailVerified: true,
      username: true,
      image: true,
      games_as_black: true,
      games_as_white: true,
      wins: true,
      losses: true,
      draws: true,
    },
  });
}

export {
  createUser,
  getUsers,
  findUserByUsername,
  findUserById,
  updateUserEmail,
  updateUserUsername,
  updateUserPassword,
  getAuthenticatedUser,
};
