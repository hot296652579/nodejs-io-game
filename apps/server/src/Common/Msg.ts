import { IPlayer, IRoom } from "./API";
import { IClientInput, ISate } from "./State";

export interface IMsgClientSync {
    input: IClientInput
    frameId: number
}

export interface IMsgServerSync {
    inputs: IClientInput[]
    lastFrameId: number
}

export interface ISyncPlayerList {
    list: IPlayer[]
}

export interface ISyncRoomList {
    list: IRoom[]
}

export interface IMsgRoomList {
    list: IRoom[]
}


export interface IMsgRoom {
    room: IRoom
}

export interface IMsgGameStart {
    state: ISate
}

