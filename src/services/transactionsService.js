import jwt from "jsonwebtoken";

import { unauthorizedError, notFoundError } from "../middlewares/errorHandlerMiddleware.js";
import { authRepository } from "../repositories/authRepository.js";
import { transactionsRepository } from "../repositories/transactionsRepository.js";


async function verifyToken(authorization) {
  if (!authorization) throw unauthorizedError('token not received');
  const token = authorization.replace('Bearer ', '');
  if (!token) throw unauthorizedError('token not received');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await checkRegisteredEmail(decoded.email);
    return {email: user.email, id: user.id};
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

export const transactionsService = {
  verifyToken,
  balance
};
