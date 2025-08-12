import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";
import { renderMailHtml, sendEmail } from "../utils/mail/mail";
import { render } from "ejs";
import { CLIENT_HOST, EMAIL_SMTP_USER } from "../utils/env";
import { ROLES } from "../utils/constant";

// This interface is used to extend the User model
export interface User {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
  createdAt?: string;
}

// This interface is used to extend the User model
const Schema = mongoose.Schema;

// This schema will be used to create the User model
const UserSchema = new Schema<User>(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      enum: [ROLES.ADMIN, ROLES.MEMBER],
      default: ROLES.MEMBER,
    },
    profilePicture: {
      type: Schema.Types.String,
      default: "user.jpg",
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: false,
    },
    activationCode: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

// This hook will be called before saving the user
UserSchema.pre("save", function (next) {
  const user = this;
  user.password = encrypt(user.password);
  user.activationCode = encrypt(user.id);
  next();
});

// This hook will be called after saving the user
UserSchema.post("save", async function (doc, next) {
  try {
    const user = doc;
    console.log("Send Email to: ", user.email);

    const contentEmail = await renderMailHtml("registration-success.ejs", {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
      activationLink: `${CLIENT_HOST}/auth/activation?code=${user.activationCode}`,
    });

    await sendEmail({
      from: EMAIL_SMTP_USER,
      to: user.email,
      subject: "Activation your Account",
      html: contentEmail,
    });
  } catch (error) {
    console.log("Error > ", error);
  } finally {
    next();
  }
});

// does not display the password at login
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// This will create a User model
const UserModel = mongoose.model("User", UserSchema); // User will save as a table name and UserSchema is a table structure

export default UserModel;
