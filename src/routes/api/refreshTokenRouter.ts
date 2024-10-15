import { Router } from "express";
import refreshTokenHandler from "../../controllers/refreshToken.controller";

const refreshTokenRouter = Router();

refreshTokenRouter.get("/", refreshTokenHandler);

export default refreshTokenRouter;
