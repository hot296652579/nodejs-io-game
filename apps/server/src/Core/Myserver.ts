import { WebSocketServer, WebSocket, EventEmitter } from "ws"
import { IApiModel } from "../Common/Model"
import { Connection } from "./Connection"

export class Myserver extends EventEmitter {
    port: number

    wss: WebSocketServer
    connections: Set<Connection> = new Set()
    registAPIMap: Map<string, Function> = new Map()

    constructor({ port }: { port: number }) {
        super()
        this.port = port
    }

    startConnect() {
        return new Promise((resolve, reject) => {
            this.wss = new WebSocketServer({ port: this.port })
            this.wss.on('listening', () => {
                resolve(true)
            })
            this.wss.on('connection', (ws: WebSocket) => {
                const cc = new Connection(this, ws)
                this.connections.add(cc)

                cc.on('close', () => {
                    this.connections.delete(cc)
                    this.emit('onclose', cc)
                })
                this.emit('onconnection')
            })
            this.wss.on('error', (e) => {
                reject(false)
            })
            this.wss.on('close', (e) => {
                reject(false)
            })
        })
    }

    registerAPI<T extends keyof IApiModel['api']>(name: T, cb: (connection: Connection, args: IApiModel['api'][T]['req']) => void) {
        this.registAPIMap.set(name, cb)
    }
}