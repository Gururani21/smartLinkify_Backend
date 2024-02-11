import { NextFunction, Request, Response, Router } from 'express';
import ResponseData from '../utils/RequestResponse';
import userBL from '../services/userServices'
import { authMiddleware } from '../middleware/authmiddleware';

const userRouter = Router();

userRouter.post('/', userBL.addUpdateUser)
userRouter.post('/loging', userBL.userLoging )
// using auth middleware to protect auth routes
userRouter.use(authMiddleware)
userRouter.put('/', userBL.addUpdateUser)


export default userRouter;