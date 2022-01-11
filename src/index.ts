import express, { Request, Response } from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { routes } from "./routes";
//connecting to sql using type orm
createConnection().then( () => {

    const app=express();

    app.use(express.json());
    app.use(cors({
        origin:['http://localhost:4200']
    }));

    routes(app);

    app.get('/', (req :Request, res: Response)=>{
        res.send("Hello World")
    })

    app.listen(8000,()=>{
        console.log("listening to port 8000")
    })
})
