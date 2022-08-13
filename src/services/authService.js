import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authRepository } from "../repositories/authRepository.js";
import { conflictError, notFoundError, unauthorizedError, wrongSchemaError } from "../middlewares/errorHandlerMiddleware.js";
import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";


async function checkEmailDuplicate(data) {
  const existingEmail = await authRepository.findByEmail(data.email);
  if (existingEmail) {
    throw conflictError("email already registered");
  }
}

async function saveUserInDb(data) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(data.password, salt);
  
  data.password = hash;
  delete data.passwordConfirmation;

  await authRepository.createUser(data);
}

function joiSignUp(data) {
  const validation = signUpSchema.validate(data);
  if (validation.error) {
    throw wrongSchemaError(validation.error.message);
  }
}

function checkPasswordConfirmation(data) {
  if (data.password !== data.passwordConfirmation) {
    throw wrongSchemaError("password and passwordConfirmation are different");
  }
}


function joiSignIn(data) {
  const validation = signInSchema.validate(data);
  if (validation.error) {
    throw wrongSchemaError(validation.error.message);
  }
}

async function checkRegisteredEmail(data) {
  const user = await authRepository.findByEmail(data.email);
  if (!user) {
    throw notFoundError("email not registered");
  }
  return user;
}

function checkPassword(data, user) {
  if (!bcrypt.compareSync(data.password, user.password)) {
    throw unauthorizedError("invalid password");
  }
}

function generateToken(email) {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 24 * 60 * 60 });
  return token;
}


export const authService = {
  checkEmailDuplicate,
  saveUserInDb,
  joiSignUp,
  checkPasswordConfirmation,
  joiSignIn,
  checkRegisteredEmail,
  checkPassword,
  generateToken
};
