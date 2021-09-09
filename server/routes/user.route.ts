/** @format */

import express from 'express';
import userController from '../controller/User.controller';
import { validRegister } from '../middlewares/validRegister';
const router = express.Router();
router.post('/register', validRegister, userController.register);
router.post('/active', userController.activeAccount);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/refreshToken', userController.refreshToken);
export default router;
