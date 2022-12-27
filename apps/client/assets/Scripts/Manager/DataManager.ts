/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-27 11:36:50
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-27 17:09:08
 * @FilePath: \cocos-nodejs-io-game-start-demo-master\apps\client\assets\Scripts\UI\JoyStickManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, Input, input, EventTouch, Vec2, UITransform } from 'cc';
import Singleton from '../Base/Singleton';
import { IActorMove, ISate } from '../Common';
import { JoyStickManager } from '../UI/JoyStickManager';
const { ccclass, property } = _decorator;

const ACTOR_SPEED = 100;
@ccclass('DataManager')
export class DataManager extends Singleton {

    jm:JoyStickManager;

    static get Instance(){
        return super.GetInstance<DataManager>();
    }

    state:ISate = {
        actors:[
            {
                id:1,
                position:{
                    x:0,
                    y:0
                },
                direction:{
                    x:1,
                    y:0
                }
            }
        ]
    }

    applyInput(input:IActorMove){
        const {id,direction:{x,y},dt} = input;

        const actor = this.state.actors.find((e) => e.id === id);
        actor.direction.x = x;
        actor.direction.y = y;
        actor.position.x += x * dt * ACTOR_SPEED;   
    }
}

