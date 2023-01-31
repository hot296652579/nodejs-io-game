import { symlinkCommon } from "./Utils";
import { WebSocketServer } from "ws";
import { EventEnum } from "./Enum";
// import { APIMsgEnum } from "./Common";

symlinkCommon();

const wss = new WebSocketServer({ port: 9876 })
let inputs = []

wss.on('connection', (socket) => {
    socket.on('message', (buffer) => {
        console.log('server message buffer :' + buffer)
        const strMsg = buffer.toString()
        try {

            const msg = JSON.parse(strMsg)
            const { name, data } = msg
            const { frameId, input } = data
            inputs.push(input)
        } catch (error) {
            console.log(error)
        }

        setInterval(() => {
            const temp = inputs
            inputs = []
            const msg = {
                event: EventEnum.MsgServerSync,
                data: {
                    inputs: temp
                }
            }

            socket.send(JSON.stringify(msg))
        }, 200)
    })


})

wss.on('close', (socket) => {
    console.log('WebSocketServer close!')
})

wss.on('listening', () => {
    console.log('服务器启动!')
})

