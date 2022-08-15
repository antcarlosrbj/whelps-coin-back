import { transactionsService } from "../services/transactionsService.js";


async function balance(req, res) {

  const { authorization } = req.headers;

  const user = await transactionsService.verifyToken(authorization);
  let balance = await transactionsService.balance(user.id);

  if (!balance) balance = 0;
  res.send(JSON.stringify(balance));

}

async function buy(req, res) {

  const { authorization } = req.headers;
  const data = req.body;

  const user = await transactionsService.verifyToken(authorization);
  transactionsService.joiValue(data);
  await transactionsService.addTransaction(user.id, data.value);

  res.sendStatus(200);
}

async function sell(req, res) {

  const { authorization } = req.headers;
  const data = req.body;

  const user = await transactionsService.verifyToken(authorization);
  transactionsService.joiValue(data);
  await transactionsService.addTransaction(user.id, -data.value);

  res.sendStatus(200);
}

export const transactionsController = {
  balance,
  buy,
  sell
};