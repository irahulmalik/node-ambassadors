import { Request, Response, Router } from "express"

import { Authenticated, login, logout, register, UpdateInfo, UpdatePassword } from "./controller/auth.controller";
import { Ambassodrs } from "./controller/user.controller";
import { AuthMiddleWare } from "./middleware/auth.middleware";

export const routes = (router:Router) =>{
   router.post("/api/admin/register", register);
   router.post("/api/admin/login", login);
   router.get("/api/admin/user", AuthMiddleWare, Authenticated);
   router.post("/api/admin/logout", AuthMiddleWare, logout);
   router.put("/api/admin/users/info", AuthMiddleWare, UpdateInfo);
   router.put("/api/admin/users/password", AuthMiddleWare, UpdatePassword);
   router.get("/api/admin/ambassadors", AuthMiddleWare, Ambassodrs);
}
