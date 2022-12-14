import { authService } from "../services/authService.js";
import { transactionsService } from "../services/transactionsService.js";


async function signUp(req, res) {

  const data = req.body;

  authService.joiSignUp(data);
  authService.checkPasswordConfirmation(data);
  await authService.checkEmailDuplicate(data);
  await authService.saveUserInDb(data);
  
  res.sendStatus(201);

}

async function signIn(req, res) {

  const data = req.body;

  authService.joiSignIn(data);
  const user = await authService.checkRegisteredEmail(data);
  authService.checkPassword(data, user);
  const token = authService.generateToken(user.email);
  
  res.send({token, name: user.name});
}

async function verifyToken(req, res) {

  const { authorization } = req.headers;

  const user = await transactionsService.verifyToken(authorization);
  
  res.send(user.name);
}


export const authController = {
  signUp,
  signIn,
  verifyToken
};