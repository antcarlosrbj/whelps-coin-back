import bcrypt from "bcrypt";

import { authRepository } from "../repositories/authRepository.js";
import { conflictError, wrongSchemaError } from "../middlewares/errorHandlerMiddleware.js";
import { signUpSchema } from "../schemas/authSchemas.js";


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



export const authService = {
  checkEmailDuplicate,
  saveUserInDb,
  joiSignUp,
  checkPasswordConfirmation
};
