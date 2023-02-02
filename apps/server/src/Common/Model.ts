import { EventEnum } from "../Enum"
import { IAPCreateRoomReq, IAPILoginReq, IAPILoginRes, IAPPlayerListReq, IAPPlayerListRes, IAPCreateRoomRes, IAPGetRoomListRes, IAPGetRoomListReq } from "./API"
import { IMsgClientSync, IMsgRoomList, IMsgServerSync, ISyncPlayerList, ISyncRoomList } from "./Msg"

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
        },
        [EventEnum.MsgGetRoomList]: {
            req: IAPGetRoomListReq,
            res: IAPGetRoomListRes
        }
    },
    msg: {
        [EventEnum.MsgClientSync]: IMsgClientSync,
        [EventEnum.MsgServerSync]: IMsgServerSync,
        [EventEnum.MsgSyncPlayerList]: ISyncPlayerList,
        [EventEnum.MsgRoomSync]: ISyncRoomList,
        [EventEnum.MsgGetRoomList]: IMsgRoomList,
    }
}