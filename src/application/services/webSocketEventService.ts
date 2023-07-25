export default interface WebSocketEventService {
    onEvent(event: string, callback: (...args: any[]) => void): void
    emitEvent(event: string, ...args: any[]): void
}