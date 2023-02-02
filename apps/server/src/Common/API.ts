export interface IPlayer {
    id: number
    nickName: string
    rid: number
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