import { AuthModel } from "@/models";
import { STATUS } from "@/typescript";
import { IUser } from "@/typescript/interfaces";
import { HttpException } from "@/utils/HttpException.utils";

class AuthService {
  protected static register = async(userData: IUser) => {
    const checkUser = await AuthModel.findOne({ email: userData.email });
    if (checkUser) {
      throw new HttpException(STATUS.BAD_REQUEST, "User already exists");
    }
    const user = new AuthModel(userData);
    await user.save();
    return {
      user: user,
      message: "Account created successfully",
    }
  }
  protected static login = async (userData: any) => {
    const user = await AuthModel.findOne({ email: userData.email });
    if (!user) {
      throw new HttpException(STATUS.NOT_FOUND, "User not found");
    }
    const isMatch = await user.comparePassword(userData.password);
    if (!isMatch) {
      throw new HttpException(STATUS.BAD_REQUEST, "Password is incorrect");
    }
    const token = user.generateAuthToken();
    return {
      token,
      user
    }
  }
}
export default AuthService;