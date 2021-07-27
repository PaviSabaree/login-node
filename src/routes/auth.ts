import express from "express";
import AuthService from "../controller/auth";


class AuthRoute  {

    public router = express.Router();
    protected authService:AuthService; 
    
    constructor() {
        this.router.post('/signup', this._signup);
        this.router.post('/signin', this._signIn);
        this.router.post('/getAuthToken', this._getAuthToken);
        this.authService = new AuthService();

    }
    
    private  _signup = async (req: express.Request, res: express.Response) => {

        try {
            const {userName, firstName, lastName, password, emailId}= req.body

            const result = await this.authService.signUp({userName, firstName, lastName, 
                password, emailId});   


               const response = {
                   status:200,
                   message: `Sucessfully created ${result}`
               }
                   res.json({ data :  response });  
            
               
    }catch (err) {
 
            console.log("Error occured in _signup",err);

                res.status(400).json({
                    message: err.toString()
                });  
           
        }
       
    }

         
           
     private  _signIn = async (req: express.Request, res: express.Response) => {
        try {
            const { emailId, password
                 }= req.body

            const result = await this.authService.signIn({
                password, emailId});   
             
               
               res.json({ data :  result });  
       
            }catch (err) {
 
            console.log("Error occured in _signIn",err);

                res.status(400).json({
                    message: err.toString()
                });  
           
        }
       }

       private _getAuthToken = async (req: express.Request, res: express.Response) => {
        try {

            const tokens = await this.authService.getAccessToken(req.body.token);

            if(!tokens && tokens === undefined) {
                throw new Error('unable to get access token');
            }

            const response  ={
                status: true,
                msg: 'new token created successfully',
                refreshtoken:  tokens.refreshToken ,
                token :  tokens.accessToken

            }

            res.json(response);  

        }catch(err){
            console.log("Error occured in _signIn",err);

            res.status(400).json({
                message: err.toString()
            });  
        }
    }

    }
    export default AuthRoute