import { Request, Response } from 'express';
import IAccount from '../models/IAccount';
import authenticate from '../utils/authenticate';
import hashPassword from '../utils/hashPassword';
import Account from '../models/Account';

const createAccount = async (request: Request, response: Response) => {
  const username = `${request.body.username}`;
  const pass = `${request.body.pass}`;
  const pass2 = `${request.body.pass2}`;

  if (!username || !pass || !pass2) {
    return response.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return response.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const password = await hashPassword(pass);

    let account = { username, password } as IAccount;

    account = await Account.create(account);

    request.session.account = { username: account.username, isAdmin: account.isAdmin };
    return response.json();
  } catch (e: any) {
    if (e.code === 11000) {
      return response.status(409).json({ error: 'Username already in use!' });
    }
    return response.status(500).json({ error: 'An error occurred!' });
  }
};

const changePassword = async (request: Request, response: Response) => {
  const username = request.session.account?.username;
  const { password, passwordConfirm } = request.body;

  if (!username || !password || !passwordConfirm) {
    return response.status(400).json({ error: 'All fields are required!' });
  }

  if (password !== passwordConfirm) {
    return response.status(400).json({ error: 'Passwords do not match!' });
  }

  const hashedPassword = await hashPassword(password);

  const account = await Account.findOne({ username: request.session.account?.username }).exec();

  if (!account) {
    return response.status(401).json({ error: 'Cannot find account!' });
  }

  account.password = hashedPassword;

  account.save();

  return response.status(200).send();
};

const login = async (request: Request, response: Response) => {
  const accountAttempt = { username: request.body.username, password: request.body.pass } as IAccount;

  if (!accountAttempt.username || !accountAttempt.password) {
    return response.status(400).json({ error: 'All fields are required!' });
  }

  const account = await authenticate(accountAttempt);

  if (!account) {
    return response.status(400).json({ error: 'Incorrect username or password!' });
  }

  request.session.account = { username: account.username, isAdmin: account.isAdmin };

  return response.status(200).send();
};

const logout = async (request: Request, response: Response) => {
  request.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      response.status(500).send({ error: 'Error logging out!' });
    } else {
      response.clearCookie('sessionCookie');
      response.status(200).send();
    }
  });
};

export {
  createAccount, changePassword, login, logout,
};
