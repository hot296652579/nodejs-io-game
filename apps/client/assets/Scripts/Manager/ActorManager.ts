/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-27 11:36:50
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-28 16:59:29
 * @FilePath: \cocos-nodejs-io-game-start-demo-master\apps\client\assets\Scripts\UI\JoyStickManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, Input, input, EventTouch, Vec2, UITransform } from 'cc';
import { EntityManager } from '../Base/EntityManager';
import { IActor } from '../Common';
import { EnityEnum } from '../Common/EnityEnum';
import { EntityStateEnum } from '../Enum';
import { ActorStateMachine } from '../Enum/ActorStateMachine';
import { JoyStickManager } from '../UI/JoyStickManager';
import { DataManager } from './DataManager';
const { ccclass, property } = _decorator;

@ccclass('ActorManager')
export class ActorManager extends EntityManager {

    init(data:IActor){
        this.fsm = this.addComponent(ActorStateMachine)
        this.fsm.init(data.type)

        this.state = EntityStateEnum.Idle
    }

    update(dt){
        if(DataManager.Instance.jm.inputVec.length()){
            const {x,y} = DataManager.Instance.jm.inputVec;
            DataManager.Instance.applyInput({
                id:1,
                type:'Actor',
                direction:{
                    x,y
                },
                dt
            })

            this.state = EntityStateEnum.Run
        }else{
            this.state = EntityStateEnum.Idle
        }
    }

    render(data:IActor){
        const {position,direction} = data
        this.node.setPosition(position.x,position.y)

        if(direction.x !== 0){
            this.node.setScale(direction.x > 0 ? 1 : -1,1)
        }
    }

    onDestroy () {
        
    }

    
}

