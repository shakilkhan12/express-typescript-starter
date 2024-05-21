import { AuthModel } from "@/models";
import { HttpException } from "@/utils/HttpException.utils";

class AuthService {
   protected register = async (userData: any) => {
    const checkUser = await AuthModel.findOne({ email: userData.email });
    if (checkUser) {
      throw new HttpException(400, "User already exists");
    }
    const user = new AuthModel(userData);
    await user.save();
    return {
      user: user,
      message: "Admin created successfully",
    }
   }
   protected login = async (userData: any) => {
      const user = await AuthModel.findOne({ email: userData.email });
      if (!user) {
        throw new HttpException(404, "User not found");
      }
      const isMatch = await user.comparePassword(userData.password);
      if (!isMatch) {
        throw new HttpException(401, "Password is incorrect");
      }
      const token = user.generateAuthToken();
      return {
        token,
        user
      }    
   }
}
export default AuthService;