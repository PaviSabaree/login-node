import express from "express"
import LoginService from "../controller/index";



class LoginClass{
    public router = express.Router();
    protected service : LoginService

    constructor() {
        this.router.get('/sample', this.checkSample);
        this.router.post('/addLoginInfos', this.addLoginInfo)
        this.router.get('/getLoginInfos', this.getLoginInfos)
        this.router.get('/getLoginInfo/:id', this.getLoginInfo)
        this.router.put('/getLoginInfo/:id', this.updateLoginInfo)
        this.router.delete('/getLoginInfo/:id', this.deleteLoginInfo)
        this.service = new LoginService()
    }

    private checkSample = async (req: express.Request, res: express.Response) => {
        
        res.json({"status":"success"})
    }

    private getLoginInfos = async (req: express.Request, res: express.Response) => {

        const result = await this.service.getLoginInfos()
        
        res.json(result)
    }
    private getLoginInfo = async (req: express.Request, res: express.Response) => {

        const result = await this.service.getLoginInfo(req.params.id)
        
        res.json(result)
    }

    private updateLoginInfo = async (req: express.Request, res: express.Response) => {

        const result = await this.service.updateLoginInfo(req.params.id, req.params.username, req.body.email, req.body.password)
        
        res.json(result)
    }

    private deleteLoginInfo = async (req: express.Request, res: express.Response) => {

        const result = await this.service.deleteLoginInfo(req.params.id)
        
        res.json(result)
    }

    private addLoginInfo = async (req: express.Request, res: express.Response) => {

        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        console.log('username ==', username)
        console.log('email ==', email)
        console.log('password ==', password)
        
        const result = await this.service.saveUser(username, email, password)
        
        res.json(result)
    }
    
}

export default LoginClass


