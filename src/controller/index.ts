import { User } from "../model/index.model";

class LoginService {
    
  
    public async saveUser(username: string, email: string, password: number): Promise<any> {
       
        try {
            const user = new User({
                username,
                email,
                password
            });

            return await user.save();
        }catch(err){
            console.debug("Error occured in saveUser");
            throw err;
        }

    }

    public async getLoginInfos(): Promise<any> {
        
        try {
            
            return await User.find().exec()
        }catch(err){
            console.debug("Error occured in saveUser");
            throw err;
        }


    }
    public async getLoginInfo(id: string): Promise<any> {
        
        try {
            
            return await User.findOne({'_id': id}).exec()
        }catch(err){
            console.debug("Error occured in saveUser");
            throw err;
        }


    }
    public async updateLoginInfo(id: string, username: string , email: string, password : number): Promise<any> {
        
        try {
            
            return await User.findOneAndUpdate({'_id': id}, {'username': username, 'email': email, 'password': password}).exec()
        }catch(err){
            console.debug("Error occured in saveUser");
            throw err;
        }


    }

    public async deleteLoginInfo(id: string): Promise<any> {
        
        try {
            
            return await User.findOneAndDelete({'_id': id}).exec()
        }catch(err){
            console.debug("Error occured in saveUser");
            throw err;
        }
    }

    
}
export default LoginService