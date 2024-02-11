//import { Prisma } from "@prisma/client";
import prisma from "../utils/prismaClient";
import { NextFunction, Request, RequestHandler, Response } from "express";
import type { User } from "@prisma/client";
import ResponseData from "../utils/RequestResponse";
import AppError from "../utils/httpException";
import appConfig from "../utils/appConfig";

import { UpdateUserReqQuery } from "../types/user";
import { userDL } from "../Data/userServiesDL";

const validateUser = (user: User, req: UpdateUserReqQuery) => {
  // validateUserInformation
  if (user.email) {
    if (!user.email.match(appConfig.emailRegex)) {
      throw new AppError(400, "Not a valid email");
    }

    if (req.email && user.email.toUpperCase() !== req.email.toUpperCase()) {
      throw new AppError(400, "Unable to update user email ");
    }

    const userData = prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (!req.email) {
      if (userData !== null) {
        throw new AppError(400, "Email Already  exist in database ");
      } else {
        throw new AppError(400, "Email should not be null or empty ");
      }
    }
  }

  if (user.password) {
    // validate password
    if (!user.password.match(appConfig.passwordRegex)) {
      throw new AppError(
        400,
        "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
      );
    }
  } else {
    throw new AppError(400, "Password should not be null or empty ");
  }

  return true;
};

const addUpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let user = req.body as User;
    const userPut = req.query as unknown as UpdateUserReqQuery;

    validateUser(user, userPut);

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
  addUpdateUser,
  userLoging,
};
