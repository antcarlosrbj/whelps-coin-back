import { prisma } from "../database.js";


async function balance(userId) {
  const response = await prisma.transactions.aggregate({
    _sum: {
      value: true
    },
    where: {
      userId
    }
  })
  return response._sum.value;
}

async function addTransaction(userId, value) {
  await prisma.transactions.create({
    data: {
      userId,
      value
    }
  })
}

export const transactionsRepository = {
  balance,
  addTransaction
};
