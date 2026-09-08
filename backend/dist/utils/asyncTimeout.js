"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTimeout = withTimeout;
exports.checkTcpPort = checkTcpPort;
const node_net_1 = __importDefault(require("node:net"));
function withTimeout(promise, ms = 2500, fallbackOrError) {
    let timer;
    const timeoutPromise = new Promise((resolve, reject) => {
        timer = setTimeout(() => {
            if (fallbackOrError instanceof Error) {
                reject(fallbackOrError);
            }
            else if (fallbackOrError !== undefined) {
                resolve(fallbackOrError);
            }
            else {
                reject(new Error(`Operation timed out after ${ms}ms`));
            }
        }, ms);
    });
    return Promise.race([
        promise.finally(() => clearTimeout(timer)),
        timeoutPromise,
    ]);
}
function checkTcpPort(host, port = 3306, timeoutMs = 1200) {
    return new Promise((resolve) => {
        const start = Date.now();
        const socket = new node_net_1.default.Socket();
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
        socket.on('error', (err) => {
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
        }
        catch (err) {
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
