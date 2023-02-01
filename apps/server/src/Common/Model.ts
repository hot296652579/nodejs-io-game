import { EventEnum } from "../Enum"
import { IAPILoginReq, IAPILoginRes } from "./API"
import { IMsgClientSync, IMsgServerSync } from "./Msg"

export interface IApiModel {
    api: {
        [EventEnum.MsgPlayerLogin]: {
            req: IAPILoginReq,
            res: IAPILoginRes
        }
    },
    msg: {
        [EventEnum.MsgClientSync]: IMsgClientSync,
        [EventEnum.MsgServerSync]: IMsgServerSync
    }
}