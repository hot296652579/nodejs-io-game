import Singleton from "../Base/Singleton";
import { Player } from "./Player";

export default class PlayerManager extends Singleton {
    static get Instance() {
        return super.GetInstance<PlayerManager>();
    }

    nextPlayerId = 1
    players: Set<Player> = new Set()
    playerIdMap: Map<number, Player> = new Map()

    createPlayer({ nickName, connection }: any) {
        const player = new Player({ id: this.nextPlayerId++, nickName, connection })
        this.players.add(player)
        this.playerIdMap.set(player.id, player)
        return player
    }

    removePlayer(pid: number) {
        const player = this.playerIdMap.get(pid)
        if (player) {
            this.players.delete(player)
            this.playerIdMap.delete(pid)
        }
    }

    getPlayerDataView({ id, nickName, rid }: Player) {
        return {
            id,
            nickName,
            rid
        }
    }
}
