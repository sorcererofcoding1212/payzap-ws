import { CONNECTION, NOTIFICATION } from "../lib/constants";

export type IncomingRequest =
  | {
      type: typeof CONNECTION;
      payload: {
        userId: string;
      };
    }
  | {
      type: typeof NOTIFICATION;
      payload: {
        content: string;
        receiverId: string
      };
    };
