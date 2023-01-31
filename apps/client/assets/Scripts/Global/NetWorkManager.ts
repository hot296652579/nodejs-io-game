import { _decorator, resources, Asset } from "cc";
import Singleton from "../Base/Singleton";
import { EventEnum } from "../Enum";

interface IItem {
    cb: Function;
    ctx: unknown;
}
export class NetWorkManager extends Singleton {
    frameId: number = 0;
    static get Instance() {
        return super.GetInstance<NetWorkManager>();
    }

    wss: WebSocket = null

    private map: Map<string, Array<IItem>> = new Map()

    port = 9876
    async connect() {
        return new Promise((resolve, reject) => {
            this.wss = new WebSocket(`ws://localhost:${this.port}`)

            this.wss.onopen = () => {
                resolve(true)
            }

            this.wss.onmessage = (messge) => {
                try {
                    console.log('onmessge : ' + messge.data)
                    const json = JSON.parse(messge.data)
                    const { event, data } = json
                    if (this.map.has(event)) {
                        this.map.get(event).forEach(({ cb, ctx }) => {
                            cb.call(ctx, data);
                        });
                    }
                } catch (error) {
                    console.log('message error:' + error)
                }
            }

            this.wss.onerror = (e) => {
                reject(false)
            }

            this.wss.close = () => {
                reject(false)
            }
        })

    }

    sendMessge(name: string, data) {
        const msg = {
            data,
            name
        }
        this.wss.send(JSON.stringify(msg))
        console.log(msg)
    }

    listenMsg(event: string, cb: Function, ctx: unknown) {
        if (this.map.has(event)) {
            this.map.get(event).push({ cb, ctx });
        } else {
            this.map.set(event, [{ cb, ctx }]);
        }
    }

    unlistenMsg(event: string, cb: Function, ctx: unknown) {
        if (this.map.has(event)) {
            const index = this.map.get(event).findIndex((i) => cb === i.cb && i.ctx === ctx);
            index > -1 && this.map.get(event).splice(index, 1);
        }
    }
}
