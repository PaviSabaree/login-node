import { Request, Response } from 'express'
import * as jwt from "jsonwebtoken";
import { IRequestExtended } from '../interfaces/IUser.interface';

const authenticateToken = (req: IRequestExtended, resp: Response, next: () => void) => {

  try {

console.log('came to auth')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if (token == null){
      return resp.sendStatus(401)
    } 
  const ACCESS_TOKEN_SECRET=" 1ff72875fd1fdb36287b0e8901262fb1547fac6b9647cc06aea129822a98873a9e05857626283f7d114c86904858b3876235d88de28348c51e63ee9fde53a384";
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
      console.log(err)

      
      if (err) {return resp.sendStatus(403)}
    
      console.log('token verified');
      req.user = user
      next()
    })

  } catch (error) {
    console.log('Authentication error  ===', error);

    throw error
  }
    

}

export default authenticateToken;