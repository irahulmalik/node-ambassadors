import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user_entity";
// import bcryptjs from "bcryptjs";
import bcryptjs from 'bcryptjs';
import { sign, verify } from "jsonwebtoken";

//register user function
export const register = async (req:Request, res:Response) => {
    const body = req.body;
    //check if both password provided are same
    if(body.password != body.confirmPassword){
        return res.status(400).send({
            message:"Passwords does not match"
        })
        
    }
    //saves user and returns password in one field and user in other
    const {password, ...user} = await getRepository(User).save({
        firstName : body.firstName,
        last_name : body.lastName,
        email: body.email,
        password: await bcryptjs.hash(body.password, 10),
        is_ambassdor:false
    });
    //return back user
    res.send(user)
}
//login functionality
export const login = async(req:Request, res:Response) =>{
    const user = await getRepository(User).findOne({email:req.body.email})
    //validating if user even exist
    if(!user){
        return res.status(400).send({message:"invalid credentials"})
    }
    //validating password
    if(!bcryptjs.compare(req.body.password, user.password)){
        return res.status(400).send({message:"invalid credentials"})
    }

    const token = sign({
        id: user.id,
    },process.env.SECRET_KEY
    );

    //storing json token in cookie
    res.cookie("jwt",token,(
        {
            httpOnly:true, 
            maxAge:24 * 60 * 60 * 1000//1 day
        }
        ))

        //sending success message
    res.send({message: "success"})
}

//function to authenicate user
export const Authenticated = async(req:Request, res:Response) => {
    try{
        const jwt = req.cookies("jwt");
        //verify cookie to validate if user is authenticated
        const payload = verify(jwt, process.env.SECRET_KEY);

        if(!payload){
            return res.status(401).send({message:"unauthenticated"})
        }

        const {password, ...user} = await getRepository(User).findOne(payload.id);

        res.send(user);
    }catch(e){
        res.status(401).send({message:"unauthenicated"})
    }
}

export const logout = async(req:Request, res:Response) => {
    res.cookie("jwt","",{maxAge:0});
    res.send({msessage:"success"})
}