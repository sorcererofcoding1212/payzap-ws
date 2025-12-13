import { Request, Response } from "express";
import { IncomingRequest } from "../types/incomingRequest";
import { UserManager } from "../managers/userManager";
import { NOTIFICATION } from "../lib/constants";

export const notifyUserHandler = async (req: Request, res: Response) => {
  try {
    const body = req.body as IncomingRequest;

    if (body.type === NOTIFICATION) {
      UserManager.getInstance().notifyUser(
        body.payload.receiverId,
        body.payload.content
      );

      res.json({
        msg: "Notification pushed",
        success: true,
      });
    } else {
      res.json({
        msg: "Invalid request",
        success: false,
      });
    }
  } catch (error) {
    console.log("NOTIFY_ERROR", error);
    res.json({
      msg: "Internal server error",
      success: false,
    });
  }
};
