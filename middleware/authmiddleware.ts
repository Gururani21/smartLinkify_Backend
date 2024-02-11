import { NextFunction, Request, Response, Router } from 'express';

export const authMiddleware= (req:Request, res:Response, next:NextFunction)=>{


    next();
}