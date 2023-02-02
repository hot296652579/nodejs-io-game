import { Connection } from "../Core";
import { Player } from "./Player";
import PlayerManager from "./PlayerManager";


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
}