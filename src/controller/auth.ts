require("dotenv").config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ILoginInfo, IUserInformation } from "../interfaces/IUser.interface";
import { UserSchema } from "../model/auth.model";
import { User } from "../model/index.model";

class AuthService {
  refreshTokens: any;
    
  /* function to create new User */
  public async signUp(userInformation: IUserInformation): Promise<any> {
    try {

      const checkExistingUser = await this._checkExistinguser(
        userInformation.emailId
      );
      const tokenInfo = {
        emailId: userInformation.emailId,
       
       
      };

      const token = await this._generateAccessToken(tokenInfo);
      const refreshtoken = await this._generateRefreshToken(tokenInfo);

      console.log("db user value ==", checkExistingUser);
     
if(checkExistingUser){
  throw new Error(
    "User Already Exist with this mail Id, Please user different user or use forget passoword"
  );
}else{
  const user = new UserSchema({
    userName: userInformation.userName,
    firstName: userInformation.firstName,
    lastName: userInformation.lastName,
    password: userInformation.password,
    emailId: userInformation.emailId
  });

  const result = await user.save();

}

 } catch (err) {
        console.log("Error occured in signUp", err);
  
        throw err;
      }
  }

      /* function to Login and get accessToken and RefreshToken */
  public async signIn(userInformation: ILoginInfo): Promise<any> {
    try {
      const user: ILoginInfo = {
        emailId: userInformation.emailId,
        password: userInformation.password,
      };
      const userDbInfo = await UserSchema.find({
        emailId: userInformation.emailId,
      }).exec();

      console.log("userDbInfo", userDbInfo);

      const passwordValidation = await this._isValidPassword(
        userDbInfo[0].password,
        user.password
      );
      if (!passwordValidation) {
        throw new Error("Given password is wrong please check you passwod");
      }

      if (userDbInfo.length) {
        const token = await this._generateAccessToken(user);
        const refreshtoken = await this._generateRefreshToken(user);
       

        this.refreshTokens.push(refreshtoken);

        return {
          status: true,
          message: "Signin Successfully.",
          data: {
            status: true,
            token,
            refreshtoken,
          },

     
    }    
  } 
    }catch(err) {
      console.log("Exception occured in signIn", err);
      throw err;
    }
  }

  public async getAccessToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let accessToken = "";
      let refreshToken = "";

      if (token == null && !this.refreshTokens.includes(token)) {
        throw new Error("not a valid token");
      }

      const REFRESH_TOKEN_SECRET="1cc35e7ee4be7393a83747b6f74f77439c1f597e3411290b7be6a92bfe1847c639f88267b7c219f1092c121377474fa073aeeb8d183656995a07f739f8c6cefa";
      jwt.verify(
        token,
        REFRESH_TOKEN_SECRET,
        async (err, user: any) => {
          if (err) {
            reject(err);
          }

          accessToken = await this._generateAccessToken({
            emailId: user.emailId,
            
          });

          refreshToken = await this._generateRefreshToken({
            emailId: user.emailId,
            
          });

          resolve({ accessToken, refreshToken });
        }
      );
    });
  }


  private async _checkExistinguser(emailId: string) {
    const dbResponse = await UserSchema.findOne({ emailId: emailId }).exec();

    console.log(dbResponse);

    return dbResponse;
  }

 private async _isValidPassword(hashPassword: string, inputPassword: string | Buffer) {
    try {
      return await bcrypt.compare(inputPassword, hashPassword);
    } catch (error) {
      throw error;
    }
  }

  private async _verifyToken(token: string): Promise<boolean> {
    let isValidToken = false;
    const ACCESS_TOKEN_SECRET=" 1ff72875fd1fdb36287b0e8901262fb1547fac6b9647cc06aea129822a98873a9e05857626283f7d114c86904858b3876235d88de28348c51e63ee9fde53a384";
    jwt.verify(
      token,
      ACCESS_TOKEN_SECRET,
      (err: any, user: any) => {
        if (err) {
          throw err;
        }
        isValidToken = true;
      }
    );

    return isValidToken;
  }

  private async _generateAccessToken(user: string | object) {
    console.log("qq", user);
    const ACCESS_TOKEN_SECRET=" 1ff72875fd1fdb36287b0e8901262fb1547fac6b9647cc06aea129822a98873a9e05857626283f7d114c86904858b3876235d88de28348c51e63ee9fde53a384";
    return jwt.sign(user, ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
  }

  private async _generateRefreshToken(user: string | object) {
    const REFRESH_TOKEN_SECRET="1cc35e7ee4be7393a83747b6f74f77439c1f597e3411290b7be6a92bfe1847c639f88267b7c219f1092c121377474fa073aeeb8d183656995a07f739f8c6cefa";
    return jwt.sign(user, REFRESH_TOKEN_SECRET, {
      expiresIn: "30m",
    });
  }

    }
    
    export default AuthService;
    