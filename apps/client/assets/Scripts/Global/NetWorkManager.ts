import { _decorator, resources, Asset } from "cc";
import Singleton from "../Base/Singleton";
import { IApiModel } from "../Common";
import { EventEnum } from "../Enum";

interface IItem {
    cb: Function;
    ctx: unknown;
}

interface ICallAPIMsg<T> {
    success: boolean,
    error?: Error,
    res?: T
}
export class NetWorkManager extends Singleton {
    frameId: number = 0;
    static get Instance() {
        return super.GetInstance<NetWorkManager>();
    }

    wss: WebSocket = null

    private map: Map<string, Array<IItem>> = new Map()

    isConnect = false
    port = 7777
    async connect() {
        return new Promise((resolve, reject) => {
            if (this.isConnect) {
                resolve(true)
                return
            }

            this.wss = new WebSocket(`ws://localhost:${this.port}`)

            this.wss.onopen = () => {
                this.isConnect = true
                resolve(true)
            }

            this.wss.onmessage = (messge) => {
                try {
                    const json = JSON.parse(messge.data)
                    console.log('onmessage : ', messge)
                    const { name, data } = json
                    if (this.map.has(name)) {
                        this.map.get(name).forEach(({ cb, ctx }) => {
                            cb.call(ctx, data);
                        });
                    }
                } catch (error) {
                    this.isConnect = false
                    console.log('message error:' + error)
                }
            }

            this.wss.onerror = (e) => {
                this.isConnect = false
                reject(false)
            }

            this.wss.close = () => {
                this.isConnect = false
                reject(false)
            }
        })
    }

    async callAPIMsg<T extends keyof IApiModel['api']>(name: T, data: IApiModel['api'][T]['req']): Promise<ICallAPIMsg<IApiModel['api'][T]['res']>> {
        return new Promise((resolve) => {
            try {
                const timeout = setTimeout(() => {
                    resolve({ success: false, error: new Error('Time out') })
                    clearTimeout(timeout)
                    this.unListenMsg(name as any, cb, null)
                }, 2000);

                const cb = function (res) {
                    resolve(res)
                    clearTimeout(timeout)
                    this.unListenMsg(name, cb, null)
                }

                this.addListenMsg(name as any, cb, null)
                this.sendMessge(name as any, data)
            } catch (error) {
                resolve({ success: false, error })
            }
        })
    }

    sendMessge<T extends keyof IApiModel['msg']>(name: T, data: IApiModel['msg'][T]) {
        const msg = {
            data,
            name
        }
        this.wss.send(JSON.stringify(msg))
    }

    addListenMsg<T extends keyof IApiModel['msg']>(event: T, cb: (args: IApiModel['msg'][T]) => void, ctx: unknown) {
        if (this.map.has(event)) {
            this.map.get(event).push({ cb, ctx });
        } else {
            this.map.set(event, [{ cb, ctx }]);
        }
    }

    unListenMsg<T extends keyof IApiModel['msg']>(event: T, cb: (args: IApiModel['msg'][T]) => void, ctx: unknown) {
        if (this.map.has(event)) {
            const index = this.map.get(event).findIndex((i) => cb === i.cb && i.ctx === ctx);
            index > -1 && this.map.get(event).splice(index, 1);
        }
    }
}
