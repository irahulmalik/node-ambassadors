import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user_entity";
// import bcryptjs from "bcryptjs";
import bcryptjs from 'bcryptjs';
import { sign } from "jsonwebtoken";


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

export const login = async(req:Request, res:Response) =>{
    const user = await getRepository(User).findOne({email:req.body.email})

    if(!user){
        return res.status(400).send({message:"invalid credentials"})
    }
    
    if(!bcryptjs.compare(req.body.password, user.password)){
        return res.status(400).send({message:"invalid credentials"})
    }

    const token = sign({
        id: user.id,
    },"secret"
    )
    res.send(token)
}