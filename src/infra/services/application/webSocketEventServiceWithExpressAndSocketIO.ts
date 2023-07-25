import { injectable } from "inversify";
import { webSocketServer } from "../../http/express/server"
import WebSocketEventService from "../../../application/services/webSocketEventService";

@injectable()
export default class WebSocketEventServiceWithExpressAndSocketIO implements WebSocketEventService {
    private socket = webSocketServer.io;

    onEvent(event: string, callback: (...args: any[]) => void): void {
        this.socket.on(event, callback);
    }

    emitEvent(event: string, ...args: any[]): void {
        this.socket.emit(event, ...args);
    }
}