import { User } from "@prisma/client";
import prisma from "../utils/prismaClient";

export const addUpdateUserDL = async (user: User) => {
  let userUpdate = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });

  if (userUpdate === null) {
    userUpdate = await prisma.user.create({ data: user });
  } else if (userUpdate !== null) {
    userUpdate.firstName = user.firstName;
    userUpdate.lastName = user.lastName;
    /// other fields
  }

  return userUpdate;
};



export const userDL = {
  addUpdateUserDL,
};
