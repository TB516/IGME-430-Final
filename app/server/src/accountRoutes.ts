import { Router } from 'express';
import { createAccount, login, logout } from './controllers/AccountController';

const accounts = Router();

accounts.post('/create', (req, res) => { createAccount(req, res); });
accounts.post('/login', (req, res) => { login(req, res); });
accounts.post('/logout', (req, res) => { logout(req, res); });

export default accounts;