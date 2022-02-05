import { Request,Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user_entity";

export const Ambassodrs = async (req:Request, res:Response) =>{
    res.send(await getRepository(User).find({
        is_ambassdor:true
    }))
}