//import { Prisma } from "@prisma/client";
import prisma from "../../utils/prismaClient";
import { NextFunction, Request, RequestHandler, Response } from "express";
import type { User } from "@prisma/client";
import ResponseData from "../../utils/RequestResponse";
import AppError from "../../utils/httpException";
import appConfig from "../../utils/appConfig";

import { UpdateUserReqQuery } from "../../types/user";
import { userDL } from "../../Data/userServiesDL";
import { userUtils } from "./utils";

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = req.body as User;

    console.log(user);
    userUtils.validateUser(user);
    userUtils.validatePassword(user.password)
    const userExists = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });
    if (userExists != null) {
      throw new AppError(400, "User Already exists with this email id");
    }
    const userData = await userDL.addUpdateUserDL(user);
    return res.json(new ResponseData("Sucess", userData));
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = req.body as User;

    const userData = await userDL.addUpdateUserDL(user);

    return res.json(new ResponseData("Sucess", userData));
  } catch (error) {
    next(error);
  }
};

const userLoging = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};

export default {
  addUser,
  updateUser,
  userLoging,
};
