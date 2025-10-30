import { Request, Response } from "express";
import { IncomingRequest } from "../types/incomingRequest";
import { TRANSFER } from "../lib/constants";
import { UserManager } from "../managers/userManager";

export const notifyUserHandler = async (req: Request, res: Response) => {
  try {
    const body = req.body as IncomingRequest;

    if (body.type === TRANSFER) {
      UserManager.getInstance().notifyUser(
        body.payload.amount,
        body.payload.recieverId,
        body.payload.senderName
      );

      res.json({
        msg: "Notification pushed",
        success: true,
      });
    } else {
      res.json({
        msg: "Invalis request",
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
