import { threadId } from "worker_threads";
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

            console.log('进入房间的玩家保存房间id:' + this.id)
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

    leaveRoom(uid: number) {
        const player = PlayerManager.Instance.playerIdMap.get(uid)
        if (player) {
            player.rid = null
            this.players.delete(player)

            if (!this.players.size) {
                RoomManager.Instance.closeRoom(this.id)
            }
        }
    }

    close() {
        this.players.clear()
    }
}