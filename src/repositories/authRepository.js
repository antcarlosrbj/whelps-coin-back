import { prisma } from "../database.js";

async function findByEmail(email) {
  return await prisma.users.findFirst({
    where: {
      email
    }
  })
}

async function createUser(data) {
  return await prisma.users.create({ data })
}


export const authRepository = {
  findByEmail,
  createUser
};
