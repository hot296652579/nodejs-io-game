import { symlinkCommon } from "./Utils";
import { WebSocketServer } from "ws";
import { EventEnum } from "./Enum";
import PlayerManager from "./Biz/PlayerManager";
import { Player } from "./Biz/Player";
import { IAPCreateRoomReq, IAPCreateRoomRes, IAPGetRoomListReq, IAPGetRoomListRes, IAPILoginReq, IAPILoginRes, IAPJoinRoomReq, IAPPlayerListReq, IAPPlayerListRes, IAPJoinRoomRes, IAPLeaveRoomRes, IAPLeaveRoomReq, IAPGameStartReq, IAPGameStartRes } from "./Common";
import { Connection } from "./Core/Connection";
import { Myserver } from "./Core/Myserver";
import RoomManager from "./Biz/RoomManager";
// import { APIMsgEnum } from "./Common";

symlinkCommon();

declare module './Core' {
    interface Connection {
        playerId: number
    }
}

const wss = new Myserver({ port: 7777 })
wss.startConnect().then(() => {
    console.log('服务器启动!')
}).catch((e) => {
    console.log('Myservere error:' + e)
})

wss.registerAPI(EventEnum.MsgPlayerLogin, (connection: Connection, data: IAPILoginReq): IAPILoginRes => {
    const { nickName } = data
    const player = PlayerManager.Instance.createPlayer({ nickName, connection })
    connection.playerId = player.id
    PlayerManager.Instance.syncPlayers()
    return {
        player: PlayerManager.Instance.getPlayerDataView(player)
    }
})

wss.registerAPI(EventEnum.MsgPlayerList, (connection: Connection, data: IAPPlayerListReq): IAPPlayerListRes => {
    return {
        list: PlayerManager.Instance.getPlayerListView()
    }
})

wss.registerAPI(EventEnum.MsgGetRoomList, (connection: Connection, data: IAPGetRoomListReq): IAPGetRoomListRes => {
    return {
        list: RoomManager.Instance.getRoomListView()
    }
})

wss.registerAPI(EventEnum.MsgCreateRoom, (connection: Connection, data: IAPCreateRoomReq): IAPCreateRoomRes => {
    if (connection.playerId) {
        const newRoom = RoomManager.Instance.createRoom()
        const room = RoomManager.Instance.joinRoom(newRoom.id, connection.playerId)

        if (room) {
            PlayerManager.Instance.syncPlayers()
            RoomManager.Instance.syncRooms()
            console.log(`playerId:${connection.playerId} -> 创建了一个房间`)
            return {
                room: RoomManager.Instance.getRoomDataView(room)
            }
        } else {
            throw new Error('房间创建失败...')
        }
    } else {
        throw new Error('未登录...')
    }
})

wss.registerAPI(EventEnum.ApiRoomJoin, (connection: Connection, { rid }: IAPJoinRoomReq): IAPJoinRoomRes => {
    if (connection.playerId) {
        const room = RoomManager.Instance.joinRoom(rid, connection.playerId)

        if (room) {
            PlayerManager.Instance.syncPlayers()
            RoomManager.Instance.syncRooms()
            RoomManager.Instance.syncRoom(room.id)
            console.log(`playerId:${connection.playerId} -> 进入了rid:${rid}房间`)
            return {
                room: RoomManager.Instance.getRoomDataView(room)
            }
        } else {
            throw new Error('房间不存在...')
        }
    } else {
        throw new Error('未登录...')
    }
})

wss.registerAPI(EventEnum.ApiGameStart, (connection: Connection, { }: IAPGameStartReq): IAPGameStartRes => {
    if (connection.playerId) {
        const player = PlayerManager.Instance.playerIdMap.get(connection.playerId)
        if (player) {
            console.log('当前房间有玩家:', player)
            const rid = player.id
            if (rid) {
                RoomManager.Instance.startGame(rid)
                PlayerManager.Instance.syncPlayers()
                RoomManager.Instance.syncRooms()
                return {

                }
            } else {
                throw new Error('房间不存在...')
            }
        }
    } else {
        throw new Error('未登录...')
    }
})

wss.registerAPI(EventEnum.ApiLeaveRoom, (connection: Connection, data: IAPLeaveRoomReq): IAPLeaveRoomRes => {
    if (connection.playerId) {
        const player = PlayerManager.Instance.playerIdMap.get(connection.playerId)
        console.log('ApiLeaveRoom player', player)
        if (player) {
            const rid = player.rid
            if (rid) {
                RoomManager.Instance.leaveRoom(rid, player.id)
                PlayerManager.Instance.syncPlayers()
                RoomManager.Instance.syncRooms()
                RoomManager.Instance.syncRoom(rid)
                console.log(`playerId:${connection.playerId} -> 离开了房间`)
            } else {
                throw new Error('玩家不在房间内')
            }
            return {}
        } else {
            throw new Error('玩家不存在...')
        }
    } else {
        throw new Error('未登录...')
    }
})

wss.on('onconnection', () => {
    console.log('有人来连接了服务器...')
})

wss.on('disconnection', (cc: Connection) => {
    const playerId = cc.playerId
    if (playerId) {
        PlayerManager.Instance.removePlayer(playerId)
        console.log('playerId:' + cc.playerId + '走了...')
    }
    PlayerManager.Instance.syncPlayers()
})


// let inputs = []

// wss.on('connection', (socket) => {
//     socket.on('message', (buffer) => {
//         console.log('server message buffer :' + buffer)
//         const strMsg = buffer.toString()
//         try {

//             const msg = JSON.parse(strMsg)
//             const { name, data } = msg
//             const { frameId, input } = data
//             inputs.push(input)
//         } catch (error) {
//             console.log(error)
//         }

//         setInterval(() => {
//             const temp = inputs
//             inputs = []
//             const msg = {
//                 event: EventEnum.MsgServerSync,
//                 data: {
//                     inputs: temp
//                 }
//             }

//             socket.send(JSON.stringify(msg))
//         }, 200)
//     })


// })

// wss.on('close', (socket) => {
//     console.log('WebSocketServer close!')
// })

// wss.on('listening', () => {
//     console.log('服务器启动!')
// })

