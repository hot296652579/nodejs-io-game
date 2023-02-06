import { EventEnum } from "../Enum"
import { IAPCreateRoomReq, IAPILoginReq, IAPILoginRes, IAPPlayerListReq, IAPPlayerListRes, IAPCreateRoomRes, IAPGetRoomListRes, IAPGetRoomListReq, IAPJoinRoomReq, IAPJoinRoomRes, IAPLeaveRoomRes, IAPLeaveRoomReq, IAPGameStartRes, IAPGameStartReq } from "./API"
import { IMsgClientSync, IMsgGameStart, IMsgRoom, IMsgRoomList, IMsgServerSync, ISyncPlayerList, ISyncRoomList } from "./Msg"

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
        },
        [EventEnum.ApiRoomJoin]: {
            req: IAPJoinRoomReq,
            res: IAPJoinRoomRes
        }
        [EventEnum.ApiLeaveRoom]: {
            req: IAPLeaveRoomReq,
            res: IAPLeaveRoomRes
        }
        [EventEnum.ApiGameStart]: {
            req: IAPGameStartReq,
            res: IAPGameStartRes
        }
    },
    msg: {
        [EventEnum.MsgClientSync]: IMsgClientSync,
        [EventEnum.MsgServerSync]: IMsgServerSync,
        [EventEnum.MsgSyncPlayerList]: ISyncPlayerList,
        [EventEnum.MsgRoomSync]: ISyncRoomList,
        [EventEnum.MsgGetRoomList]: IMsgRoomList,
        [EventEnum.MsgRoom]: IMsgRoom,
        [EventEnum.MsgGameStart]: IMsgGameStart,
    }
}