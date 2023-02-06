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
        console.log('加入的房间id :', rid)
        console.log('room: ', room)
        if (room) {
            room.join(uid)
            return room
        }
    }

    closeRoom(pid: number) {
        const room = this.roomIdMap.get(pid)
        if (room) {
            room.close()
            this.rooms.delete(room)
            this.roomIdMap.delete(room.id)
        }
    }

    startGame(rid: number) {
        const room = this.roomIdMap.get(rid)
        if (room) {
            room.start()
        }
    }

    syncRooms() {
        for (const player of PlayerManager.Instance.players) {
            player.connection.sendMessge(EventEnum.MsgRoomSync, {
                list: this.getRoomListView()
            })
        }
    }

    getRoomDataView({ id, players }: Room) {
        return {
            id,
            players: PlayerManager.Instance.getPlayerListView(players)
        }
    }

    getRoomListView(rooms: Set<Room> = this.rooms) {
        return [...rooms].map((p) => this.getRoomDataView(p)) //集合 转成 数组
    }
    /**同步房间内信息*/
    syncRoom(rid: number) {
        const room = this.roomIdMap.get(rid)
        if (room) {
            room.sync()
        }
    }

    leaveRoom(rid: number, uid: number) {
        const room = this.roomIdMap.get(rid)
        if (room) {
            room.leaveRoom(uid)
        }
    }
}
