import { NextFunction, Request, Response } from "express";
import { getUserData } from "../utils/jwt";
import { IReqUser } from "../utils/interfaces";
import response from "../utils/response";

// This middleware will check if the user is authenticated
export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return response.unauthorized(res);
  }

  // Split the authorization header to get the token
  const [prefix, accessToken] = authorization.split(" ");

  if (!(prefix === "bearer" || prefix === "Bearer" && accessToken)) {
    return response.unauthorized(res);
  }

  const user = getUserData(accessToken);

  if (!user) {
    return response.unauthorized(res);
  }

  (req as IReqUser).user = user;

  next();
};
