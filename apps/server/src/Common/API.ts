export interface IPlayer {
    id: number
    nickName: string
    rid: number
}

export interface IRoom {
    id: number
    players: IPlayer[]
}
/**登陆请求 客户端传入nickName数据*/
export interface IAPILoginReq {
    nickName: string
}
/**返回player数据*/
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

export interface IAPJoinRoomReq {
    rid: number
}

export interface IAPJoinRoomRes {
    room: IRoom
}

export interface IAPLeaveRoomReq {

}

export interface IAPLeaveRoomRes {

}


export interface IAPGameStartReq {

}

export interface IAPGameStartRes {

}
