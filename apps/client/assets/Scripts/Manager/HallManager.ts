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
import { EnityEnum, IActor, IAPILoginRes, IAPPlayerListRes } from '../Common';
import { EntityStateEnum, EventEnum, InputTypeEnum, SceneEnum } from '../Enum';
import { ActorStateMachine } from '../Enum/ActorStateMachine';
import EventManager from '../Global/EventManager';
import { NetWorkManager } from '../Global/NetWorkManager';
import { JoyStickManager } from '../UI/JoyStickManager';
import { PlayerItem } from '../UI/PlayerItem';
import { radToAngle } from '../Utils';
import { DataManager } from './DataManager';
import { WeaponManager } from './WeaponManager';
const { ccclass, property } = _decorator;

@ccclass('HallManager')
export class HallManager extends Component {
    @property(Node)
    content: Node = null

    @property(Prefab)
    playerItemPreab: Prefab = null

    async start() {
        NetWorkManager.Instance.listenMsg(EventEnum.MsgSyncPlayerList, this.renderPlayerList, this)

        this.content.removeAllChildren()

        this.getPlayersList()
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

    renderPlayerList({ list }: IAPPlayerListRes) {
        for (const c of this.content.children) {
            c.active = false
        }

        while (this.content.children.length < list.length) {
            const playerItemPreb = instantiate(this.playerItemPreab)
            playerItemPreb.active = false
            playerItemPreb.setParent(this.content)
        }

        for (let index = 0; index < list.length; index++) {
            const data = list[index]
            const node = this.content.children[index]
            node.getComponent(PlayerItem).init(data)
            node.active = true
        }

    }

    onDestroy() {
        NetWorkManager.Instance.unlistenMsg(EventEnum.MsgSyncPlayerList, this.renderPlayerList, this)
    }


}

