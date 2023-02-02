import { EventEmitter, WebSocketServer, WebSocket } from "ws";
import { IApiModel } from "../Common/Model";
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
                    const msg = JSON.parse(strMsg)
                    // console.log('msg', msg)
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

    sendMessge<T extends keyof IApiModel['msg']>(name: T, data: IApiModel['msg'][T]) {
        const msg = {
            data,
            name
        }
        this.ws.send(JSON.stringify(msg))
        console.log('sendMessge', msg)
    }

    listenMsg<T extends keyof IApiModel['msg']>(event: T, cb: (args: IApiModel['msg'][T]) => void, ctx: unknown) {
        if (this.mapMsg.has(event)) {
            this.mapMsg.get(event).push({ cb, ctx });
        } else {
            this.mapMsg.set(event, [{ cb, ctx }]);
        }
    }

    unlistenMsg<T extends keyof IApiModel['msg']>(event: T, cb: (args: IApiModel['msg'][T]) => void, ctx: unknown) {
        if (this.mapMsg.has(event)) {
            const index = this.mapMsg.get(event).findIndex((i) => cb === i.cb && i.ctx === ctx);
            index > -1 && this.mapMsg.get(event).splice(index, 1);
        }
    }
}