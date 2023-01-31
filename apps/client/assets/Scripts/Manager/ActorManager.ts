/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-27 11:36:50
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-28 16:59:29
 * @FilePath: \cocos-nodejs-io-game-start-demo-master\apps\client\assets\Scripts\UI\JoyStickManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, Input, input, EventTouch, Vec2, UITransform, instantiate, ProgressBar } from 'cc';
import { EntityManager } from '../Base/EntityManager';
import { EnityEnum, IActor } from '../Common';
import { EntityStateEnum, EventEnum, InputTypeEnum } from '../Enum';
import { ActorStateMachine } from '../Enum/ActorStateMachine';
import EventManager from '../Global/EventManager';
import { JoyStickManager } from '../UI/JoyStickManager';
import { radToAngle } from '../Utils';
import { DataManager } from './DataManager';
import { WeaponManager } from './WeaponManager';
const { ccclass, property } = _decorator;

@ccclass('ActorManager')
export class ActorManager extends EntityManager {
    @property(ProgressBar)
    prog: ProgressBar = null;

    wm: WeaponManager = null;

    bulletType: string;
    id: number;

    init(data: IActor) {
        this.id = data.id
        this.bulletType = data.bulletType;
        this.fsm = this.addComponent(ActorStateMachine)
        this.fsm.init(data.type)

        this.state = EntityStateEnum.Idle

        const weapon = DataManager.Instance.prefabeMap.get('Weapon1')
        const weaponPreb = instantiate(weapon)

        weaponPreb.setParent(this.node)
        this.wm = weaponPreb.addComponent(WeaponManager)
        this.wm.init(data)
    }

    update(dt) {
        if (DataManager.Instance.jm.inputVec.length()) {
            const { x, y } = DataManager.Instance.jm.inputVec;
            if (this.id != DataManager.Instance.MYSELF_PLAYERID) return

            EventManager.Instance.emit(EventEnum.MsgClientSync, {
                id: 1,
                type: InputTypeEnum.ActorMove,
                direction: {
                    x, y
                },
                dt
            })
            // DataManager.Instance.applyInput({
            //     id: 1,
            //     type: InputTypeEnum.ActorMove,
            //     direction: {
            //         x, y
            //     },
            //     dt
            // })

            this.state = EntityStateEnum.Run
        } else {
            this.state = EntityStateEnum.Idle
        }
    }

    render(data: IActor) {
        const { position, direction } = data
        this.node.setPosition(position.x, position.y)

        if (direction.x !== 0) {
            this.node.setScale(direction.x > 0 ? 1 : -1, 1)
            this.prog.node.setScale(direction.x > 0 ? 1 : -1, 1)
        }

        const side = Math.sqrt(direction.x ** 2 + direction.y ** 2)
        const rad = Math.asin(direction.y / side)
        const angle = radToAngle(rad)
        this.wm.node.setRotationFromEuler(0, 0, angle)
        // console.log('angle:' + angle)

        this.prog.progress = data.hp / this.prog.totalLength
    }

    onDestroy() {

    }


}

