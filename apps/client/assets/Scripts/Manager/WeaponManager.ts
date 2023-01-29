/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-27 11:36:50
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-28 16:59:29
 * @FilePath: \cocos-nodejs-io-game-start-demo-master\apps\client\assets\Scripts\UI\JoyStickManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, Input, input, EventTouch, Vec2, UITransform, instantiate } from 'cc';
import { EntityManager } from '../Base/EntityManager';
import { IActor } from '../Common';
import { EntityStateEnum } from '../Enum';
import { ActorStateMachine } from '../Enum/ActorStateMachine';
import { WeaponStateMachine } from '../Enum/WeaponStateMachine';
import { JoyStickManager } from '../UI/JoyStickManager';
import { DataManager } from './DataManager';
const { ccclass, property } = _decorator;

@ccclass('WeaponManager')
export class WeaponManager extends EntityManager {


    init(data:IActor){
        this.fsm = this.addComponent(WeaponStateMachine)
        this.fsm.init(data.weaponType)

        this.state = EntityStateEnum.Idle
    }

    onDestroy () {
        
    }

    
}

