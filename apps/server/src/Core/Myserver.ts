import { WebSocketServer, WebSocket } from "ws"
import { Connection } from "./Connection"

export class Myserver {
    port: number

    wss: WebSocketServer
    connections: Set<Connection> = new Set()
    registAPIMap: Map<string, Function> = new Map()

    constructor({ port }: { port: number }) {
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

                    console.log('liule liule....')
                })

                console.log('有人连接 !')
            })
            this.wss.on('error', (e) => {
                reject(false)
            })
            this.wss.on('close', (e) => {
                reject(false)
            })
        })
    }

    registerAPI(name, cb: Function) {
        this.registAPIMap.set(name, cb)
    }
}