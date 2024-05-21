import jwt from "jsonwebtoken";
import { model, Schema, Document, Model } from "mongoose";
import { HttpException } from "@/utils/HttpException.utils";
import { comparePassword, hashPassword } from "@/utils/password.utils";
import { CONFIG } from "@/config";
import { IUser } from "@/typescript/interfaces";

// Define an interface that extends Mongoose's Document to include the methods
interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(expiresIn?: string): string;
}

// Define an interface for the model
interface IUserModel extends Model<IUserDocument> {}
// Create the schema
const userSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    unique: true,
    index: true,
    required: [true, "Email is required"],
    validate: {
      validator: function (value: string) {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 20,
    required: [true, "Password is required"],
    validate: {
      validator: function (value: string) {
        if (value.length < 5) {
          throw new Error("Password must be at least 6 characters long");
        } else if (value.length > 20) {
          throw new Error("Password must be at most 20 characters long");
        }
      },
    },
  },
}, {
  timestamps: true,
});

// Hash password before saving the document
userSchema.pre<IUserDocument>("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await hashPassword(this.password);
    }
    next();
  } catch (err:any) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  try {
    const isMatch = await comparePassword(candidatePassword, this.password);
    return isMatch;
  } catch (err: any) {
    throw new HttpException(401, err.message);
  }
};

// Method to generate auth token
userSchema.methods.generateAuthToken = function (expiresIn = "1w") {
  const token = jwt.sign({ _id: this._id }, CONFIG.JWT_SECRET as string, { expiresIn });
  return token;
};

// Create the model
const AuthModel: IUserModel = model<IUserDocument, IUserModel>("User", userSchema);

AuthModel.createIndexes({ unique: true });
export { AuthModel };
