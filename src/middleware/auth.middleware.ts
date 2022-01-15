import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../entity/user_entity";

export const AuthMiddleWare =async (req:Request, res:Response) => {
    try{
        const jwt = req.cookies("jwt");
        //verify cookie to validate if user is authenticated
        const payload = verify(jwt, process.env.SECRET_KEY);

        if(!payload){
            return res.status(401).send({message:"unauthenticated"})
        }
        // if we need user in next function too we can send it like this
        res["user"] = await getRepository(User).findOne(payload.id);

        // we dont send user but put next() to execute next function
        // res.send(user);

        next();
    }catch(e){
        res.status(401).send({message:"unauthenicated"})
    }
    
}