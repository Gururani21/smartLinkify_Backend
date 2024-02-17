import { User } from "@prisma/client";
import appConfig from "../../utils/appConfig";
import AppError from "../../utils/httpException";

export const validateUser = (user: User) => {
  if (user.email) {
    if (!user.email.match(appConfig.emailRegex)) {
      throw new AppError(400, "Not a valid email ");
    }
  } else {
    throw new AppError(400, "Email should not be null or empty");
  }
  if (!user.firstName) {
    throw new AppError(400, "FirstName should not be null or empty");
  }
  if (!user.lastName) {
    throw new AppError(400, "Last Name should not be null or empty");
  }

  return true;
};

export const validatePassword = (password: string | null) => {
  if (password) {
    // validate password
    // if (!password.match(appConfig.passwordRegex)) {
    //   throw new AppError(
    //     400,
    //     "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
    //   );
    // }
  } else {
    throw new AppError(400, "Password should not be null or empty ");
  }
};

export const userUtils = {
  validatePassword,
  validateUser,
};
