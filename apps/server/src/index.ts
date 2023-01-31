import { symlinkCommon } from "./Utils";
import { WebSocketServer } from "ws";
import { EventEnum } from "./Enum";
import { Connection, Myserver } from "./Core";
// import { APIMsgEnum } from "./Common";

symlinkCommon();

const wss = new Myserver({ port: 9876 })
wss.startConnect().then(() => {
    console.log('服务器启动!')
}).catch((e) => {
    console.log('Myservere error:' + e)
})

wss.registerAPI(EventEnum.MsgPlayerLogin, (cc: Connection, data: any) => {
    return data + '我是服务端 我收到了消息'
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

