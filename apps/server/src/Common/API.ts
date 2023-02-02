export interface IPlayer {
    id: number
    nickName: string
    rid: number
}

export interface IRoom {
    id: number
    players: IPlayer[]
}

export interface IAPILoginReq {
    nickName: string
}

export interface IAPILoginRes {
    player: IPlayer
}

export interface IAPPlayerListReq { }

export interface IAPPlayerListRes {
    list: IPlayer[]
}

export interface IAPCreateRoomReq { }

export interface IAPCreateRoomRes {
    room: IRoom
}

export interface IAPGetRoomListReq { }

export interface IAPGetRoomListRes {
    list: IRoom[]
}