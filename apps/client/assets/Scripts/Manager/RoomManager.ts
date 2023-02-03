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
import { EnityEnum, IActor, IAPGetRoomListRes, IAPILoginRes, IAPPlayerListRes, IMsgRoom } from '../Common';
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

@ccclass('RoomManager')
export class RoomManager extends Component {
    @property(Node)
    playerListContent: Node = null

    @property(Prefab)
    playerItemPreab: Prefab = null

    onLoad() {
        NetWorkManager.Instance.addListenMsg(EventEnum.MsgRoom, this.renderPlayerList, this)
        // NetWorkManager.Instance.addListenMsg(EventEnum.MsgRoomSync, this.renderRoomList, this)
    }

    start() {
        this.playerListContent.removeAllChildren()

        this.renderPlayerList({
            room: DataManager.Instance.roomInfo
        })
    }

    renderPlayerList({ room: { players: list } }: IMsgRoom) {
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

    onDestroy() {
        NetWorkManager.Instance.unListenMsg(EventEnum.MsgRoom, this.renderPlayerList, this)
    }


}

