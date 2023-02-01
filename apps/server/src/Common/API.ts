interface IPlayer {
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