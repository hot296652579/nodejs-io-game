import { IPlayer } from "./API";
import { IClientInput } from "./State";

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