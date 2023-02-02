import Singleton from "../Base/Singleton";
import { EnityEnum, EventEnum, IAPILoginReq, IPlayer } from "../Common";
import { Connection } from "../Core";
import { Player } from "./Player";

export default class PlayerManager extends Singleton {
    static get Instance() {
        return super.GetInstance<PlayerManager>();
    }

    nextPlayerId = 1
    players: Set<Player> = new Set()
    playerIdMap: Map<number, Player> = new Map()

    createPlayer({ nickName, connection }: IAPILoginReq & { connection: Connection }) {
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

    syncPlayers() {
        for (const player of this.players) {
            player.connection.sendMessge(EventEnum.MsgSyncPlayerList, {
                list: this.getPlayerListView()
            })
        }
    }

    getPlayerDataView({ id, nickName, rid }: Player) {
        return {
            id,
            nickName,
            rid
        }
    }

    getPlayerListView(players: Set<Player> = this.players) {
        return [...this.players].map((p) => this.getPlayerDataView(p)) //集合 转成 数组
    }
}
