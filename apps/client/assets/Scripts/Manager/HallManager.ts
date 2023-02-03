/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-27 11:36:50
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-28 16:59:29
 * @FilePath: \cocos-nodejs-io-game-start-demo-master\apps\client\assets\Scripts\UI\JoyStickManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, Input, input, EventTouch, Vec2, UITransform, instantiate, ProgressBar, EditBox, resources, director, Prefab } from 'cc';
import { EntityManager } from '../Base/EntityManager';
import { EnityEnum, IActor, IAPGetRoomListRes, IAPILoginRes, IAPPlayerListRes } from '../Common';
import { EntityStateEnum, EventEnum, InputTypeEnum, SceneEnum } from '../Enum';
import { ActorStateMachine } from '../Enum/ActorStateMachine';
import EventManager from '../Global/EventManager';
import { NetWorkManager } from '../Global/NetWorkManager';
import { JoyStickManager } from '../UI/JoyStickManager';
import { PlayerItem } from '../UI/PlayerItem';
import { RoomItem } from '../UI/RoomItem';
import { radToAngle } from '../Utils';
import { DataManager } from './DataManager';
import { WeaponManager } from './WeaponManager';
const { ccclass, property } = _decorator;

@ccclass('HallManager')
export class HallManager extends Component {
    @property(Node)
    playerListContent: Node = null

    @property(Prefab)
    playerItemPreab: Prefab = null

    @property(Node)
    roomListContent: Node = null

    @property(Prefab)
    roomItemPreab: Prefab = null

    async start() {
        director.preloadScene(SceneEnum.Room)

        this.playerListContent.removeAllChildren()
        this.roomListContent.removeAllChildren()

        this.getPlayersList()
        this.getRoomList()
    }

    onLoad() {
        EventManager.Instance.on(EventEnum.RoomJoin, this.handlerJoinRoom, this)
        NetWorkManager.Instance.addListenMsg(EventEnum.MsgSyncPlayerList, this.renderPlayerList, this)
        NetWorkManager.Instance.addListenMsg(EventEnum.MsgRoomSync, this.renderRoomList, this)
    }

    async getPlayersList() {
        const { success, error, res } = await NetWorkManager.Instance.callAPIMsg(EventEnum.MsgPlayerList, {})
        if (!success) {
            console.log('回掉消息发生错误' + error)
            return
        }

        console.log('hall res:' + res)

        this.renderPlayerList(res)
    }

    async getRoomList() {
        const { success, error, res } = await NetWorkManager.Instance.callAPIMsg(EventEnum.MsgGetRoomList, {})
        if (!success) {
            console.log('回掉消息发生错误' + error)
            return
        }

        console.log('MsgGetRoomList res:' + res)

        this.renderRoomList(res)
    }

    renderRoomList({ list }: IAPGetRoomListRes) {
        for (const c of this.roomListContent.children) {
            c.active = false
        }

        while (this.roomListContent.children.length < list.length) {
            const playerItemPreb = instantiate(this.roomItemPreab)
            playerItemPreb.active = false
            playerItemPreb.setParent(this.roomListContent)
        }

        for (let index = 0; index < list.length; index++) {
            const data = list[index]
            const node = this.roomListContent.children[index]
            node.getComponent(RoomItem).init(data)
        }
    }

    renderPlayerList({ list }: IAPPlayerListRes) {
        for (const c of this.playerListContent.children) {
            c.active = false
        }

        while (this.playerListContent.children.length < list.length) {
            const playerItemPreb = instantiate(this.playerItemPreab)
            playerItemPreb.active = false
            playerItemPreb.setParent(this.playerListContent)
        }

        for (let index = 0; index < list.length; index++) {
            const data = list[index]
            const node = this.playerListContent.children[index]
            node.getComponent(PlayerItem).init(data)
            node.active = true
        }
    }

    async clickCreateRoomHandler() {
        const { success, error, res } = await NetWorkManager.Instance.callAPIMsg(EventEnum.MsgCreateRoom, {})
        if (!success) {
            console.log('创建房间发生错误:', error)
            return
        }

        DataManager.Instance.roomInfo = res.room
        console.log('DataManager.Instance.roomInfo:', DataManager.Instance.roomInfo)
        director.loadScene(SceneEnum.Room)
    }

    async handlerJoinRoom(rid: number) {
        const { success, error, res } = await NetWorkManager.Instance.callAPIMsg(EventEnum.ApiRoomJoin, {
            rid
        })
        if (!success) {
            console.log('创建房间发生错误:', error)
            return
        }

        DataManager.Instance.roomInfo = res.room
        console.log('DataManager.Instance.roomInfo:', DataManager.Instance.roomInfo)
        director.loadScene(SceneEnum.Room)
    }

    onDestroy() {
        NetWorkManager.Instance.unListenMsg(EventEnum.MsgSyncPlayerList, this.renderPlayerList, this)
        NetWorkManager.Instance.unListenMsg(EventEnum.MsgRoomSync, this.renderRoomList, this)
        EventManager.Instance.off(EventEnum.RoomJoin, this.handlerJoinRoom, this)
    }


}

