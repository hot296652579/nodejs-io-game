import Singleton from "../Base/Singleton";
import { EnityEnum, EventEnum, IAPILoginReq, IPlayer } from "../Common";
import { Connection } from "../Core";
import { Player } from "./Player";
import PlayerManager from "./PlayerManager";
import { Room } from "./Room";

export default class RoomManager extends Singleton {
    static get Instance() {
        return super.GetInstance<RoomManager>();
    }

    nextRoomId = 1
    rooms: Set<Room> = new Set()
    roomIdMap: Map<number, Room> = new Map()

    createRoom() {
        const room = new Room(this.nextRoomId++)
        this.rooms.add(room)
        this.roomIdMap.set(room.id, room)
        return room
    }

    joinRoom(rid: number, uid: number) {
        const room = this.roomIdMap.get(rid)
        if (room) {
            room.join(uid)
            return room
        }
    }

    // removePlayer(pid: number) {
    //     const player = this.playerIdMap.get(pid)
    //     if (player) {
    //         this.players.delete(player)
    //         this.playerIdMap.delete(pid)
    //     }
    // }

    // syncPlayers() {
    //     for (const player of this.players) {
    //         player.connection.sendMessge(EventEnum.MsgSyncPlayerList, {
    //             list: this.getPlayerListView()
    //         })
    //     }
    // }

    getRoomDataView({ id, players }: Room) {
        return {
            id,
            players: PlayerManager.Instance.getPlayerListView(players)
        }
    }

    getRoomListView(rooms: Set<Room> = this.rooms) {
        return [...rooms].map((p) => this.getRoomDataView(p)) //集合 转成 数组
    }
}