import { symlinkCommon } from "./Utils";
import { WebSocketServer } from "ws";

symlinkCommon();

const wss = new WebSocketServer({ port: 9898 })

wss.on('connection', (socket) => {
    socket.on('message', (buffer) => {
        console.log('message buffer:' + buffer)
    })

    const obj = {
        event: 'axiba',
        data: '阿西吧 从服务器来的数据这句'
    }

    socket.send(JSON.stringify(obj))
})

wss.on('close', (socket) => {
    console.log('WebSocketServer close!')
})

wss.on('listening', () => {
    console.log('服务器启动!')
})

