import { transactionsService } from "../services/transactionsService.js";


async function balance(req, res) {

  const { authorization } = req.headers;

  const user = await transactionsService.verifyToken(authorization);
  let balance = await transactionsService.balance(user.id);

  if (!balance) balance = 0;
  res.send(JSON.stringify(balance));

}

export const transactionsController = {
  balance
};