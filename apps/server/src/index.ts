import { symlinkCommon } from "./Utils";
import { WebSocketServer } from "ws";
import { EventEnum } from "./Enum";
import PlayerManager from "./Biz/PlayerManager";
import { Player } from "./Biz/Player";
import { IAPCreateRoomReq, IAPCreateRoomRes, IAPILoginReq, IAPILoginRes, IAPPlayerListReq, IAPPlayerListRes } from "./Common";
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

wss.registerAPI(EventEnum.MsgCreateRoom, (connection: Connection, data: IAPCreateRoomReq): IAPCreateRoomRes => {
    if (connection.playerId) {
        const newRoom = RoomManager.Instance.createRoom()
        const room = RoomManager.Instance.joinRoom(newRoom.id, connection.playerId)
        if (room) {
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

