import {Response} from 'express';



//this is a funciton to sendrefreshtoken
export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie("jid", token, {
        httpOnly: true
    });
}