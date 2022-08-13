import { authService } from "../services/authService.js";


async function signUp(req, res) {

  const data = req.body;

  authService.joiSignUp(data);
  authService.checkPasswordConfirmation(data);
  await authService.checkEmailDuplicate(data);
  await authService.saveUserInDb(data);
  
  res.sendStatus(201);
}


export const authController = {
  signUp
};