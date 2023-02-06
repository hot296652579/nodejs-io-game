import { threadId } from "worker_threads";
import { EnityEnum, EventEnum, ISate } from "../Common";
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
            player.rid = this.id
            this.players.add(player)

            console.log('当前房间所有玩家 : ', this.players)
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
            // this.players.delete(player)

            if (!this.players.size) {
                RoomManager.Instance.closeRoom(this.id)
            }
        }
    }

    start() {
        console.log('游戏开始 players数据 ..' + this.players)
        const state: ISate = {
            actors: [...this.players].map((player, index) => {
                return {
                    id: player.id,
                    nickName: player.nickName,
                    type: EnityEnum.EnityEnum_ACTOR1,
                    weaponType: EnityEnum.EnityEnum_Weapon1,
                    bulletType: EnityEnum.EnityEnum_Bullet2,
                    hp: 100,
                    position: {
                        x: -100 + index * 100,
                        y: -100 + index * 100
                    },
                    direction: {
                        x: 1,
                        y: 0
                    }
                }
            }),
            bullets: [],
            nextShoot: 1
        }
        console.log(' state数据... : ', state)
        for (const player of this.players) {
            player.connection.sendMessge(EventEnum.MsgGameStart, {
                state
            })
        }
    }

    close() {
        this.players.clear()
    }
}