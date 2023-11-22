import { db } from "../../utils/db";

async function getAuthenticatedUser(id: string) {
  return await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      verified_email: true,
      username: true,
      image: true,
      with_provider: true,
    },
  });
}

async function findUserByEmail(email: string) {
  return await db.user.findUnique({ where: { email: email } });
}

async function createGoogleUser(user: {
  username: string;
  email: string;
  image: string;
}) {
  return await db.user.create({
    data: { ...user, with_provider: true, verified_email: true },
  });
}

export { getAuthenticatedUser, findUserByEmail, createGoogleUser };
