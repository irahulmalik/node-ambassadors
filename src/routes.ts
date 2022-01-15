import { Request, Response, Router } from "express"

import { Authenticated, login, logout, register } from "./controller/auth.controller";

export const routes = (router:Router) =>{
   router.post("/api/admin/register", register);
   router.post("/api/admin/login", login);
   router.post("/api/admin/user", Authenticated);
   router.post("/api/admin/logout", logout);
}
