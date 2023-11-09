import { io, Socket } from "socket.io-client";
import { env } from "@/../env";

export class SocketService {
  private static instance: SocketService | null = null;
  private socket: Socket | null = null;

  private constructor() {
    this.socket = io(env.NEXT_PUBLIC_SERVER_URL, {
      autoConnect: false,
    });
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public getSocket(): Socket {
    if (!this.socket) {
      throw new Error("Socket has not been initialized.");
    }
    return this.socket;
  }
}
