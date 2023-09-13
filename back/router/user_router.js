import { Router } from "express";
import {UserController} from "../controller/user_controller.js";
import { body, validationResult } from 'express-validator';
import role_middleware from "../middleware/role_middleware.js";
import loginMiddleware from "../middleware/auth_middleware.js";


const router = new Router();
const userController = new UserController();

router.post(
    '/user',
    role_middleware(['admin']),
    [
        body('nickname').isLength({min:4}).withMessage('некорректное имя пользователя'),
        body('mail').isEmail().withMessage('некорректный адрес электронной почты'),
        body('password').isLength({ min: 6 }).withMessage('некорректный пароль'),
    ],
    userController.createUser
);
router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getOneUser);
router.put(
    '/user',
    role_middleware(['admin']),
    [
        body('nickname').isLength({min:4}).withMessage('некорректное имя пользователя'),
        body('mail').isEmail().withMessage('некорректный адрес электронной почты'),
    ],        
    userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.post(
    '/registration', 
    [
        body('nickname').isLength({min:4}).withMessage('некорректное имя пользователя'),
        body('mail').isEmail().withMessage('некорректный адрес электронной почты'),
        body('password').isLength({ min: 6 }).withMessage('некорректный пароль'),
        
    ],
    userController.registration
);  
router.post('/login',loginMiddleware, userController.login);
router.get('/main', userController.getCookie);

export default router;