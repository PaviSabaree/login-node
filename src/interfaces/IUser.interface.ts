import { Request } from 'express';
export interface IUserInformation {

        userName: string,
        firstName: string,
        lastName: string,
        password: string,
        emailId: string,
       
    
}


export interface IRequestExtended extends Request{
       user : ILoginInfo
}

export interface ILoginInfo{
        emailId: string,
        password: string,
        userName?: string
   
}

export interface IEmailInfo{
        emailId: string,
        subject: string,
        emailBody: string
   
}

