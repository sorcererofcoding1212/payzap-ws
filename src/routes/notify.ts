import { Router } from "express";
import { notifyUserHandler } from "../controllers/notify";

const route = Router();

route.post("/notify", notifyUserHandler);

export default route;
