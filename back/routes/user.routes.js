import { Router } from "express";
import {UserController} from "../controller/user.controller.js";

const router = new Router();
const userController = new UserController();


router.post('/user', userController.createUser);
router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getOneUser);
router.put('/user', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/main', userController.getCookie);

export default router;