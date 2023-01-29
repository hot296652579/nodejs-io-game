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
import { EntityStateEnum, EventEnum } from '../Enum';
import { ActorStateMachine } from '../Enum/ActorStateMachine';
import EventManager from '../Global/EventManager';
import { JoyStickManager } from '../UI/JoyStickManager';
import { radToAngle } from '../Utils';
import { DataManager } from './DataManager';
import { WeaponManager } from './WeaponManager';
const { ccclass, property } = _decorator;

@ccclass('ShootManager')
export class ShootManager extends Component {


    init(){

    }

   shootHanlder(){
    EventManager.Instance.emit(EventEnum.WeaponShoot)
   }

    onDestroy () {
        
    }

    
}

