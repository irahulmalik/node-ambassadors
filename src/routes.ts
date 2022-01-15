import { Request, Response, Router } from "express"

import { Authenticated, login, logout, register } from "./controller/auth.controller";
import { AuthMiddleWare } from "./middleware/auth.middleware";

export const routes = (router:Router) =>{
   router.post("/api/admin/register", register);
   router.post("/api/admin/login", login);
   router.get("/api/admin/user", AuthMiddleWare, Authenticated);
   router.post("/api/admin/logout", AuthMiddleWare, logout);
}
