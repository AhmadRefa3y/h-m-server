import { Router } from "express";
import refreshTokenHandler from "../../controllers/refreshToken.controller";
import logoutHandler from "../../controllers/logout.controller";

const logOutRouter = Router();

logOutRouter.get("/", logoutHandler);

export default logOutRouter;
