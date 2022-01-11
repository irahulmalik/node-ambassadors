import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user_entity";
// import bcryptjs from "bcryptjs";
import bcryptjs from 'bcryptjs';


export const register = async (req:Request, res:Response) => {
    const body = req.body;

    if(body.password != body.confirmPassword){
        return res.status(400).send({
            message:"Passwords does not match"
        })
        
    }
        const user = await getRepository(User).save({
            firstName : body.firstName,
            last_name : body.lastName,
            email: body.email,
            password: await bcryptjs.hash(body.password, 10),
            is_ambassdor:false
        });
    
    res.send(user)
}