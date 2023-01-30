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
import { EntityStateEnum, EventEnum, InputTypeEnum } from '../Enum';
import { ActorStateMachine } from '../Enum/ActorStateMachine';
import { WeaponStateMachine } from '../Enum/WeaponStateMachine';
import EventManager from '../Global/EventManager';
import { JoyStickManager } from '../UI/JoyStickManager';
import { DataManager } from './DataManager';
const { ccclass, property } = _decorator;

@ccclass('WeaponManager')
export class WeaponManager extends EntityManager {
    private body:Node = null;
    private anchor:Node = null;
    private point:Node = null;

    private data:IActor;

    owner:number;

    init(data:IActor){
        this.data = data
        this.owner = data.id
        this.body = this.node.getChildByName('Body')
        this.anchor = this.body.getChildByName('Anchor')
        this.point = this.anchor.getChildByName('Point')

        this.addEvents()
        this.fsm = this.addComponent(WeaponStateMachine)
        this.fsm.init(data.weaponType)

        this.state = EntityStateEnum.Idle
    }

    addEvents(){
        EventManager.Instance.on(EventEnum.WeaponShoot,this.shootHanlder,this)
        EventManager.Instance.on(EventEnum.BulletBorn,this.bulletBornHanlder,this)
    }

    bulletBornHanlder(owner:number){
        if(owner != this.owner)return

        this.state = EntityStateEnum.Attack
    }

    shootHanlder(){
        if(this.owner != DataManager.Instance.MYSELF_PLAYERID)return
        
        const pointWorld = this.point.getWorldPosition()
        const pointStagePosition = DataManager.Instance.UIStage.getComponent(UITransform).convertToNodeSpaceAR(pointWorld)
        const anchorWorldPos = this.anchor.getWorldPosition()
        const direction = new Vec2(pointWorld.x - anchorWorldPos.x,pointWorld.y - anchorWorldPos.y).normalize()

        DataManager.Instance.applyInput({
            owner:this.owner,
            type:InputTypeEnum.ActorShoot,
            direction:{
                x:direction.x,
                y:direction.y
            },
            position:{
                x:pointStagePosition.x,
                y:pointStagePosition.y
            }
        })

        // console.log(DataManager.Instance.state.bullets)
    }

    onDestroy () {
        EventManager.Instance.off(EventEnum.WeaponShoot,this.shootHanlder,this)
    }

    
}

