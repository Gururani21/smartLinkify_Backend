import { Router } from 'express';
import userRouter from './userRoutes';


const api = Router().use('/user', userRouter)
 ;

export default Router().use('/api', api);