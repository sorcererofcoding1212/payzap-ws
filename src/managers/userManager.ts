import { WebSocket } from "ws";
import { OutgoingRequest } from "../types/outgoingRequest";
import { NOTIFICATION } from "../lib/constants";

export class UserManager {
  private static instance: UserManager;
  private userIdToUserSocketMap: Map<string, WebSocket>;
  private userSocketToUserIdMap: Map<WebSocket, string>;

  private constructor() {
    this.userIdToUserSocketMap = new Map();
    this.userSocketToUserIdMap = new Map();
  }

  public static getInstance() {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }

    return UserManager.instance;
  }

  public addUser(userSocket: WebSocket, userId: string) {
    this.checkDuplicateConnection(userId);
    this.userIdToUserSocketMap.set(userId, userSocket);
    this.userSocketToUserIdMap.set(userSocket, userId);
  }

  private checkDuplicateConnection(userId: string) {
    const duplicateConnection = this.userIdToUserSocketMap.get(userId);
    if (duplicateConnection) {
      duplicateConnection.close();
      this.userIdToUserSocketMap.delete(userId);
      this.userSocketToUserIdMap.delete(duplicateConnection);
    }
  }

  public deleteConnection(userSocket: WebSocket) {
    const userId = this.userSocketToUserIdMap.get(userSocket);
    this.userSocketToUserIdMap.delete(userSocket);
    if (userId) {
      this.userIdToUserSocketMap.delete(userId);
    }
  }

  public notifyUser(amount: number, recieverId: string, senderName: string) {
    const targetSocket = this.userIdToUserSocketMap.get(recieverId);
    if (targetSocket && targetSocket.readyState === WebSocket.OPEN) {
      const outgoingMessage: OutgoingRequest = {
        type: NOTIFICATION,
        payload: {
          msg: `Recieved INR ${amount} from ${senderName}`,
        },
      };
      targetSocket.send(JSON.stringify(outgoingMessage));
    }
  }
}
