import "reflect-metadata";
import {ApolloServer} from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import {UserResolvers} from './UserResolvers';
import { createConnection } from "typeorm";
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { verify } from "jsonwebtoken";
import { createAcccessToken, createRefreshToken } from "./auth";
import { User } from "./entity/User";
import { sendRefreshToken } from "./sendRefreshToken";
import cors from 'cors';
import express from 'express';
import { TechniqueResolver } from "./TechniqueResolver";
// import { Technique } from "./entity/Techniques";



(async () => {
    const app = express();
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }))
    app.use(cookieParser())
    app.get('/', (_req, res) => res.send('hello'));

    app.post ('/refresh_token', async (req, res) => {
       console.log(req.cookies); //cookier parser will parser through the response given on the post req and hand us the cookie
       const token = req.cookies.jid
       console.log(token)
       if (!token) {
           return res.send({ ok: false, accessToken: ''})
       }
       let payload: any = null;
       try {
           payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
       } catch(err) {
           console.log(err)
           return res.send({ ok: false, accessToken: ''})
       } 
       //token is valid and we can send back an accessToken
       const user = await User.findOne({ id: payload.userId})
       if (!user) {
           return res.send({ ok: false, accessToken: ''})
       }
       //given that we found a user, next line of code reads...
       //if user token version does not equal the user token version on the payload
       // give no accesstoken
       //this will be used for forget passwords or account hacks
       //find extra login in auth and userResolvers
       if (user.tokenVersion !== payload.tokenVersion) {
           return res.send({ ok: false, accessToken: ""});
       }
       //this part next line of code is to refresh the users access token if he/she has been using the site activley
       //found in login in SendRefreshToken
       sendRefreshToken(res, createRefreshToken(user));

       return res.send({ ok: true, accessToken: createAcccessToken(user) }); 
          
   });

//    app.post('/techniques', async (req: any, res: any) => {
//        const {title, description, image} = req.body
//        try {
//            const technique = Technique.create({title, description, image})
//            await technique.save()
//            return res.json(technique)

//        } catch(err) {
//            console.log(err)
//        }
       

//    })

    await createConnection();


    
    const apolloServer = new ApolloServer({
       schema: await buildSchema({
            resolvers: [UserResolvers, TechniqueResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    });

    apolloServer.applyMiddleware({app, cors: false})
    app.listen(4000, () => {
        console.log('express server has started')
    });
})();
// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
