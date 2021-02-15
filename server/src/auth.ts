import { sign } from "jsonwebtoken";
import { User } from "./entity/User";

export const createAcccessToken = (user: User) => {
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '15m'
    });
};


export const createRefreshToken = (user: User) => {
    return sign({ 
        userId: user.id, 
        //this is where the token version logic is on our user
        tokenVersion: user.tokenVersion }, 
        process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: '7d'
    })
}

// tokenVersion: user.tokenVersion