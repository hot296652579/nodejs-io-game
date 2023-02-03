import { EnityEnum, EventEnum } from "../Common";
import { Connection } from "../Core";
import { Player } from "./Player";
import PlayerManager from "./PlayerManager";
import RoomManager from "./RoomManager";


export class Room {
    id: number
    players: Set<Player> = new Set()

    constructor(rid: number) {
        this.id = rid
    }

    join(uid: number) {
        const player = PlayerManager.Instance.playerIdMap.get(uid)
        if (player) {
            player.id = this.id
            this.players.add(player)
        }
    }

    sync() {
        for (const player of this.players) {
            player.connection.sendMessge(EventEnum.MsgRoom, {
                room: RoomManager.Instance.getRoomDataView(this)
            })
        }
    }
}