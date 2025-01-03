import { NextFunction, Request, Response } from "express";
import { getUserData, IUserToken } from "../utils/jwt";

// This interface is used to extend the Request interface
export interface IReqUser extends Request {
  user?: IUserToken;
}

// This middleware will check if the user is authenticated
export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(403).json({
      message: "unauthorized",
      data: null,
    });
  }

  // Split the authorization header to get the token
  const [prefix, accessToken] = authorization.split(" ");

  if (!(prefix === "Bearer" && accessToken)) {
    return res.status(403).json({
      message: "unauthorized",
      data: null,
    });
  }

  const user = getUserData(accessToken);

  if (!user) {
    return res.status(403).json({
      message: "unauthorized",
      data: null,
    });
  }

  (req as IReqUser).user = user;

  next();
};
