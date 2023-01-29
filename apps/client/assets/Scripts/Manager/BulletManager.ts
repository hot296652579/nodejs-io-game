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
import { EnityEnum, IActor, IBullet } from '../Common';
import { EntityStateEnum, InputTypeEnum } from '../Enum';
import { ActorStateMachine } from '../Enum/ActorStateMachine';
import { BulletStateMachine } from '../Enum/BulletStateMachine';
import { JoyStickManager } from '../UI/JoyStickManager';
import { radToAngle } from '../Utils';
import { DataManager } from './DataManager';
import { WeaponManager } from './WeaponManager';
const { ccclass, property } = _decorator;

@ccclass('BulletManager')
export class BulletManager extends EntityManager {

    wm:WeaponManager = null;

    bulletType:string;

    init(data:IBullet){
        this.bulletType = data.type;
        this.fsm = this.addComponent(BulletStateMachine)
        this.fsm.init(data.type)

        this.state = EntityStateEnum.Idle
    }

    render(data:IBullet){
        const {position,direction} = data
        this.node.setPosition(position.x,position.y)

        const side = Math.sqrt(direction.x ** 2 + direction.y ** 2)
        // const rad = Math.asin(direction.y / side)
        const angle = direction.x > 0 ? radToAngle(Math.asin(direction.y / side)):radToAngle(Math.asin(-direction.y / side)) + 180
        this.node.setRotationFromEuler(0,0,angle)
        // console.log('angle:' + angle)
    }

    onDestroy () {
        
    }

    
}

