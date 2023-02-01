/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-27 11:36:50
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-28 16:59:29
 * @FilePath: \cocos-nodejs-io-game-start-demo-master\apps\client\assets\Scripts\UI\JoyStickManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, Input, input, EventTouch, Vec2, UITransform, instantiate, ProgressBar, EditBox } from 'cc';
import { EntityManager } from '../Base/EntityManager';
import { EnityEnum, IActor } from '../Common';
import { EntityStateEnum, EventEnum, InputTypeEnum } from '../Enum';
import { ActorStateMachine } from '../Enum/ActorStateMachine';
import EventManager from '../Global/EventManager';
import { NetWorkManager } from '../Global/NetWorkManager';
import { JoyStickManager } from '../UI/JoyStickManager';
import { radToAngle } from '../Utils';
import { DataManager } from './DataManager';
import { WeaponManager } from './WeaponManager';
const { ccclass, property } = _decorator;

@ccclass('LoginManager')
export class LoginManager extends Component {
    @property(EditBox)
    editBox: EditBox = null;

    async start() {
        await NetWorkManager.Instance.connect()
    }

    onLoad() {

    }

    async clickLoginHandler() {
        if (!NetWorkManager.Instance.isConnect) {
            console.log('没有连接服务器...')
            await NetWorkManager.Instance.connect()
        }

        const nickName = this.editBox.string
        if (!nickName) {
            console.log('阿西吧你输点东西啊...')
            return
        }

        const { success, error, res } = await NetWorkManager.Instance.callAPIMsg(EventEnum.MsgPlayerLogin, { nickName })
        if (!success) {
            console.log('回掉消息发生错误' + error)
            return
        }

        DataManager.Instance.Myself_PlayerID = res.player.id
        console.log('有玩家登陆,nickName :' + res.player.nickName)
    }

    onDestroy() {

    }


}

