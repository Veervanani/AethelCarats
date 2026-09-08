import net from 'node:net';

export function withTimeout<T>(
  promise: Promise<T>,
  ms: number = 2500,
  fallbackOrError?: T | Error
): Promise<T> {
  let timer: NodeJS.Timeout;

  const timeoutPromise = new Promise<T>((resolve, reject) => {
    timer = setTimeout(() => {
      if (fallbackOrError instanceof Error) {
        reject(fallbackOrError);
      } else if (fallbackOrError !== undefined) {
        resolve(fallbackOrError);
      } else {
        reject(new Error(`Operation timed out after ${ms}ms`));
      }
    }, ms);
  });

  return Promise.race([
    promise.finally(() => clearTimeout(timer)),
    timeoutPromise,
  ]);
}

export interface TcpProbeResult {
  host: string;
  port: number;
  reachable: boolean;
  latencyMs?: number;
  error?: string;
}

export function checkTcpPort(host: string, port: number = 3306, timeoutMs: number = 1200): Promise<TcpProbeResult> {
  return new Promise((resolve) => {
    const start = Date.now();
    const socket = new net.Socket();
    let settled = false;

    const cleanup = () => {
      socket.removeAllListeners();
      socket.destroy();
    };

    socket.setTimeout(timeoutMs);

    socket.on('connect', () => {
      if (!settled) {
        settled = true;
        const latencyMs = Date.now() - start;
        cleanup();
        resolve({ host, port, reachable: true, latencyMs });
      }
    });

    socket.on('timeout', () => {
      if (!settled) {
        settled = true;
        cleanup();
        resolve({
          host,
          port,
          reachable: false,
          error: `TCP connection timed out after ${timeoutMs}ms (host is unresponsive or dropping packets)`,
        });
      }
    });

    socket.on('error', (err: any) => {
      if (!settled) {
        settled = true;
        cleanup();
        resolve({
          host,
          port,
          reachable: false,
          error: err.code || err.message,
        });
      }
    });

    try {
      socket.connect(port, host);
    } catch (err: any) {
      if (!settled) {
        settled = true;
        cleanup();
        resolve({
          host,
          port,
          reachable: false,
          error: err.message,
        });
      }
    }
  });
}
