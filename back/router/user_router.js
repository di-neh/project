import { Router } from "express";
import {UserController} from "../controller/user_controller.js";
import { body, validationResult } from 'express-validator';
import role_middleware from "../middleware/role_middleware.js";
import loginMiddleware from "../middleware/login_middleware.js";
import regMiddleware from "../middleware/reg_middleware.js";


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
    regMiddleware,
    userController.createUser
);
router.get(
    '/user',
    role_middleware(['admin']),
    userController.getUsers);

router.get(
    '/user/:id',
    role_middleware(['admin']),
    userController.getOneUser);

router.get(
    '/main/user',
    role_middleware(['admin', 'user']),
    userController.getUserProfile);

    router.put(
        '/main/password', 
        [
            body('passwordNew').isLength({min:4}).withMessage('некорректный пароль'),
        ],      
        userController.changePassword);

router.put(
    '/user',
    role_middleware(['admin']),
    [
        body('nickname').isLength({min:4}).withMessage('некорректное имя пользователя'),
        body('mail').isEmail().withMessage('некорректный адрес электронной почты'),
    ],      
    regMiddleware,  
    userController.updateUser);
router.delete(
    '/user/:id',
    role_middleware(['admin']),
    userController.deleteUser);
router.post(
    '/registration', 
    [
        body('nickname').isLength({min:4}).withMessage('некорректное имя пользователя'),
        body('mail').isEmail().withMessage('некорректный адрес электронной почты'),
        body('password').isLength({ min: 6 }).withMessage('некорректный пароль'),
        
    ],
    regMiddleware,
    userController.registration
);  
router.post('/login',loginMiddleware, userController.login);
router.get('/main', userController.getCookie);
router.delete('/main', userController.logOut);

export default router;