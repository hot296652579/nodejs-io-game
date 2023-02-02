import { EventEnum } from "../Enum"
import { IAPCreateRoomReq, IAPILoginReq, IAPILoginRes, IAPPlayerListReq, IAPPlayerListRes, IAPCreateRoomRes } from "./API"
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
        },
        [EventEnum.MsgCreateRoom]: {
            req: IAPCreateRoomReq,
            res: IAPCreateRoomRes
        }
    },
    msg: {
        [EventEnum.MsgClientSync]: IMsgClientSync,
        [EventEnum.MsgServerSync]: IMsgServerSync,
        [EventEnum.MsgSyncPlayerList]: ISyncPlayerList
    }
}