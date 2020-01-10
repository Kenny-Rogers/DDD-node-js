import { createController } from "awilix-koa";

import manageUserAPI from "../api/manageUser";

const manageUserRoutes = createController(manageUserAPI)
  .prefix("/user")
  .post("/create", "createUser")
  .patch("/update/:id", "updateUser");
