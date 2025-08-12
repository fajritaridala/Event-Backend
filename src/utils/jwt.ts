import jwt from "jsonwebtoken";
import { SECRET } from "./env";
import { IUserToken } from "./interfaces";



// generate token
export const generateToken = (user: IUserToken): string => {
  const token = jwt.sign(user, SECRET, {
    expiresIn: "1h",
  });
  return token;
};

// get user data from token
export const getUserData = (token: string) => {
  const user = jwt.verify(token, SECRET) as IUserToken;
  return user;
};
