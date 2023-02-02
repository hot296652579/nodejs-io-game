import { EventEnum } from "../Enum"
import { IAPILoginReq, IAPILoginRes, IAPPlayerListReq, IAPPlayerListRes } from "./API"
import { IMsgClientSync, IMsgServerSync, ISyncPlayerList } from "./Msg"

export interface IApiModel {
    api: {
        [EventEnum.MsgPlayerLogin]: {
            req: IAPILoginReq,
            res: IAPILoginRes
        },
        [EventEnum.MsgPlayerList]: {
            req: IAPPlayerListReq,
            res: IAPPlayerListRes
        }
    },
    msg: {
        [EventEnum.MsgClientSync]: IMsgClientSync,
        [EventEnum.MsgServerSync]: IMsgServerSync,
        [EventEnum.MsgSyncPlayerList]: ISyncPlayerList
    }
}