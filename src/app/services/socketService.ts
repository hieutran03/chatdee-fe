import { io, Socket } from 'socket.io-client';

/**
 * Centralized Socket.IO client service
 * Manages socket connection lifecycle and provides access to the socket instance
 */
class SocketService {
  private socket: Socket | null = null;
  private connectionPromise: Promise<Socket> | null = null;

  /**
   * Initialize and connect the socket with authentication token
   * @param token - Authentication token
   * @returns Promise that resolves when socket is connected
   */
  connect(token: string): Promise<Socket> {
    if (this.socket?.connected) {
      return Promise.resolve(this.socket);
    }

    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      const SOCKET_URL = (import.meta as any).env.VITE_WEBSOCKET_URL as string;

      this.socket = io(SOCKET_URL, {
        auth: { token },
        transports: ['websocket'],
      });

      this.socket.on('connect', () => {
        console.log('Socket connected:', this.socket?.id);
        this.connectionPromise = null;
        resolve(this.socket!);
      });

      this.socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
        this.connectionPromise = null;
        reject(err);
      });

      this.socket.on('exception', (err: any) => {
        console.error('Socket exception:', err);
      });
    });

    return this.connectionPromise;
  }

  /**
   * Get the current socket instance
   * @returns Socket instance or null if not connected
   */
  getSocket(): Socket | null {
    return this.socket;
  }

  /**
   * Wait for socket to be available (with retry logic)
   * @param maxRetries - Maximum number of retries (default: 20)
   * @param delayMs - Delay between retries in milliseconds (default: 100)
   * @returns Promise that resolves with socket or null if timeout
   */
  async waitForSocket(maxRetries: number = 20, delayMs: number = 100): Promise<Socket | null> {
    for (let i = 0; i < maxRetries; i++) {
      if (this.socket?.connected) {
        return this.socket;
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
    return null;
  }

  /**
   * Check if socket is currently connected
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Disconnect the socket
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connectionPromise = null;
    }
  }

  /**
   * Register an event listener on the socket
   * @param event - Event name
   * @param handler - Event handler function
   */
  on(event: string, handler: (...args: any[]) => void): void {
    this.socket?.on(event, handler);
  }

  /**
   * Remove an event listener from the socket
   * @param event - Event name
   * @param handler - Event handler function (optional)
   */
  off(event: string, handler?: (...args: any[]) => void): void {
    if (handler) {
      this.socket?.off(event, handler);
    } else {
      this.socket?.off(event);
    }
  }

  /**
   * Emit an event to the server
   * @param event - Event name
   * @param data - Data to send
   */
  emit(event: string, data?: any): void {
    this.socket?.emit(event, data);
  }
}

// Export singleton instance
export const socketService = new SocketService();
