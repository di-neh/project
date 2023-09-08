import { Router } from "express";
import {UserController} from "../controller/user_controller.js";
import { body, validationResult } from 'express-validator';
import penis from "../middleware/role_middleware.js";
import loginMiddleware from "../middleware/auth_middleware.js";


const router = new Router();
const userController = new UserController();

router.post('/user', userController.createUser);
router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getOneUser);
router.put('/user', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.post(
    '/registration', 
    [
        body('nickname').isLength({min:4}).withMessage('Имя пользователя должно содержать минимум 4 символа'),
        body('mail').isEmail().withMessage('Введите действительный адресс электронной почты'),
        body('password').isLength({ min: 6 }).withMessage('Пароль должен содержать минимум 6 символов'),
    ],
    userController.registration
);  
router.post('/login',loginMiddleware, penis(['admin']), userController.login);
router.get('/main', userController.getCookie);

export default router;