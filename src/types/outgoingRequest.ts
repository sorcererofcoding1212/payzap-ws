import { NOTIFICATION } from "../lib/constants";

export type OutgoingRequest = {
  type: typeof NOTIFICATION;
  payload: {
    msg: string;
  };
};
