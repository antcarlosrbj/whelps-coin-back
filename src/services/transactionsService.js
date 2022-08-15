import jwt from "jsonwebtoken";

import { unauthorizedError, notFoundError, wrongSchemaError } from "../middlewares/errorHandlerMiddleware.js";
import { authRepository } from "../repositories/authRepository.js";
import { transactionsRepository } from "../repositories/transactionsRepository.js";
import { valueSchema } from "../schemas/transactionsSchemas.js";


async function verifyToken(authorization) {
  if (!authorization) throw unauthorizedError('token not received');
  const token = authorization.replace('Bearer ', '');
  if (!token) throw unauthorizedError('token not received');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await checkRegisteredEmail(decoded.email);
    return {email: user.email, id: user.id, name: user.name};
  } catch(err) {
    throw unauthorizedError(err.message);
  }
}

async function checkRegisteredEmail(email) {
  const user = await authRepository.findByEmail(email);
  if (!user) {
    throw notFoundError("email not registered");
  }
  return user;
}

async function balance(userId) {
  const balance = await transactionsRepository.balance(userId);
  return balance;
}

function joiValue(data) {
  const validation = valueSchema.validate(data);
  if (validation.error) {
    throw wrongSchemaError(validation.error.message);
  }
}

async function addTransaction(userId, value) {
  await transactionsRepository.addTransaction(userId, value);
}

export const transactionsService = {
  verifyToken,
  balance,
  joiValue,
  addTransaction
};
