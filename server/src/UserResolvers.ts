import {Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware} from 'type-graphql';
import { User } from './entity/User';
import { compare, hash } from 'bcryptjs';
// import { sign } from 'jsonwebtoken';
import { MyContext } from './MyContext';
import { createAcccessToken, createRefreshToken } from './auth';
import { isAuth } from './isAuth';
import { sendRefreshToken } from './sendRefreshToken';
import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';






@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => User)
    user: User;
}



@Resolver()
export class UserResolvers {
    @Query(() => String)
    hello() {
        return 'hi!';
    }

    @Query(() => String)
    testing() {
        return 'hi from testing'
    }

    //protected route example
    @Query(() => String)
    @UseMiddleware(isAuth)
    bye(
        @Ctx() {payload}: MyContext
    ) {
        console.log(payload);
        return `your user id is: ${payload!.userId}`;
    }


    @Query(() => [User])
    users() {
        return User.find();
    }

    @Query(() => User, {nullable: true})
    me(
        @Ctx() context: MyContext
    ) {
        const authorization = context.req.headers['authorization'];

        if(!authorization) {
            throw null;
        }
    
        try {
            const token = authorization.split(' ')[1]
            const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!)
            context.payload = payload as any;
            return User.findOne(payload.userId);
    
        } catch(err) {
            console.log(err);
            return null
        }
    }

    //logout query Mutation
    @Mutation(() => Boolean)
    async logout(@Ctx() {res}: MyContext){
        //sending emtpy string instead of authorization
        sendRefreshToken(res, '');
        

        return true    
}

    //this query will be used in the case where a user foregts a password and we need to wipe 
    //the sessions for a partifular user
    //find in auth
    //**NOTE you will want to make this a function that can not be accessed by the user in production */
    @Mutation(() => Boolean)
    async revokeRefreshTokenForUser (
        @Arg('userId', () => Int) userId: number
    ){
        await getConnection().getRepository(User).increment({id: userId}, "tokenVersion", 1);

        return true
        
    }


    //login Query
    @Mutation(() => LoginResponse)
    async login(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string,
        @Ctx() {res}: MyContext
    ): Promise<LoginResponse>{
        const user = await User.findOne({where: {email} });
        if (!user) {
            throw new Error ('could not find user');
        }
        const valid = await compare(password, user.password);
        if (!valid) {
            throw new Error ('wrong password');
        }
        //login succcesful

        //logic found in sendRefreshToken
        sendRefreshToken(res, createRefreshToken(user))

        //this will returnour access token when email and password match
        return {
            accessToken: createAcccessToken(user),
            user
    };
}

    //sign up query
    @Mutation(() => Boolean)
     async register(
        @Arg('email') email: string,
        @Arg('password') password: string,

    ) {

        const hashedPassword = await hash(password, 12);

        await User.insert({
            email,
            password: hashedPassword
        });
        return true;
    }
    
}