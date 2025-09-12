import { Request, Response } from "express";
import * as Yup from "yup";
import UserModel from "../models/user.model";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { IReqUser } from "../utils/interfaces";
import response from "../utils/response";

// login data type
type TLogin = {
  identifier: string;
  password: string;
};

// register data type
type TRegister = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// register validation schema to validate the data
const registerValidateSchema = Yup.object({
  fullName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .required()
    .min(6, "Password must be at least 6 characters")
    .test(
      "at-least-one-uppercase-latter",
      "Contains at least one uppercase later",
      (value) => {
        if (!value) return false;
        const regex = /^(?=.*[A-Z])/;
        return regex.test(value);
      }
    )
    .test("at-least-one-number", "Contains at least one number", (value) => {
      if (!value) return false;
      const regex = /^(?=.*\d)/;
      return regex.test(value);
    }),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), ""], "Password not match"), // validate password
});

export default {
  // register endpoint
  async register(req: Request, res: Response) {
    /**
    #swagger.tags = ["Auth"]
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/RegisterRequest"}
    }
     */

    // get data from request body
    console.log(req.body  )
    const { fullName, username, email, password, confirmPassword } =
      req.body as unknown as TRegister;

    try {
      // validate the data
      await registerValidateSchema.validate({
        fullName,
        username,
        email,
        password,
        confirmPassword,
      });

      // check if the email already exists
      const result = await UserModel.create({
        fullName,
        username,
        email,
        password,
      });

      response.success(res, result, "success registration");
    } catch (error) {
      response.error(res, error, "failed registration");
    }
  },

  // login endpoint
  async login(req: Request, res: Response) {
    /**
    #swagger.tags = ["Auth"]
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/LoginRequest"}
    }
     */

    // get data from request body
    const { identifier, password } = req.body as unknown as TLogin;

    try {
      // check if the user exists
      const userByIdentifier = await UserModel.findOne({
        $or: [
          {
            email: identifier,
          },
          {
            username: identifier,
          },
        ],
        isActive: true,
      });

      // if user not found
      if (!userByIdentifier) {
        return response.unauthorized(res, "user not found");
      }

      // validate the password
      const validatePassword: boolean =
        encrypt(password) === userByIdentifier.password;

      // if password not match
      if (!validatePassword) {
        return response.unauthorized(res, "user not found");
      }

      // generate token
      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });

      // if there are no problem with password
      response.success(res, token, "login success");
    } catch (error) {
      response.error(res, error, "login failed");
    }
  },

  // get user profile endpoint
  async me(req: IReqUser, res: Response) {
    /**
    #swagger.tags = ["Auth"]
    #swagger.security = [{
      "bearerAuth": []
    }]
     */
    try {
      const user = req.user;
      const result = await UserModel.findById(user?.id);
      response.success(res, result, "success get user profile");
    } catch (error) {
      response.error(res, error, "failed get user profile");
    }
  },

  // activate user endpoint
  async activation(req: Request, res: Response) {
    /**
    #swagger.tags = ["Auth"]
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/ActivationRequest"}
    }
     */
    try {
      // get activation code from request body
      const { code } = req.body as { code: string };

      const user = await UserModel.findOneAndUpdate(
        {
          activationCode: code,
        },
        {
          isActive: true,
        },
        {
          new: true,
        }
      );
      response.success(res, user, "user successfully activated");
    } catch (error) {
      response.error(res, error, "user failed activated");
    }
  },
};
