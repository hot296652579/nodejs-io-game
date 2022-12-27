/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-27 11:36:50
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-27 16:46:36
 * @FilePath: \cocos-nodejs-io-game-start-demo-master\apps\client\assets\Scripts\UI\JoyStickManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, Input, input, EventTouch, Vec2, UITransform } from 'cc';
import { JoyStickManager } from '../UI/JoyStickManager';
import { DataManager } from './DataManager';
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {
    @property(Node)
    stage:Node = null;

    @property(Node)
    joyStick:Node = null;

    @property(Node)
    actor:Node = null;

    onLoad () {
       DataManager.Instance.jm = this.joyStick.getComponent(JoyStickManager);
    }

    onDestroy () {
        
    }

    
}

