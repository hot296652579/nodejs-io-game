import { EventEmitter, WebSocketServer, WebSocket } from "ws";
import { Myserver } from "./Myserver";

interface IItem {
    cb: Function;
    ctx: unknown;
}

export class Connection extends EventEmitter {
    private mapMsg: Map<string, Array<IItem>> = new Map()

    constructor(private myserver: Myserver, private ws: WebSocket) {
        super()

        this.ws.on('close', () => {
            this.emit('close')
        })

        this.ws.on('message', (buffer: Buffer) => {
            try {
                const strMsg = buffer.toString()
                try {
                    // console.log(buffer)
                    const msg = JSON.parse(strMsg)
                    const { name, data } = msg

                    if (this.myserver.registAPIMap.has(name)) {
                        // console.log('调用已经注册的接口...')
                        const cb = this.myserver.registAPIMap.get(name)
                        const res = cb.call(null, this, data)
                        this.sendMessge(name, {
                            success: true,
                            res
                        })
                    } else {
                        if (this.mapMsg.has(name)) {
                            this.mapMsg.get(name).forEach(({ cb, ctx }) => {
                                cb.call(ctx, data)
                            })
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            } catch (error) {
                console.log(error)
            }
        })
    }

    sendMessge(event: string, data) {
        const msg = {
            data,
            event
        }
        this.ws.send(JSON.stringify(msg))
        // console.log(msg)
    }

    listenMsg(event: string, cb: Function, ctx: unknown) {
        if (this.mapMsg.has(event)) {
            this.mapMsg.get(event).push({ cb, ctx });
        } else {
            this.mapMsg.set(event, [{ cb, ctx }]);
        }
    }

    unlistenMsg(event: string, cb: Function, ctx: unknown) {
        if (this.mapMsg.has(event)) {
            const index = this.mapMsg.get(event).findIndex((i) => cb === i.cb && i.ctx === ctx);
            index > -1 && this.mapMsg.get(event).splice(index, 1);
        }
    }
}