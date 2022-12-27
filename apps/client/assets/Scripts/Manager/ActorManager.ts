/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-27 11:36:50
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-27 16:59:45
 * @FilePath: \cocos-nodejs-io-game-start-demo-master\apps\client\assets\Scripts\UI\JoyStickManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, Input, input, EventTouch, Vec2, UITransform } from 'cc';
import { JoyStickManager } from '../UI/JoyStickManager';
import { DataManager } from './DataManager';
const { ccclass, property } = _decorator;

@ccclass('ActorManager')
export class ActorManager extends Component {


    onLoad () {

    }

    update(dt){
        if(DataManager.Instance.jm.inputVec.length){
            const {x,y} = DataManager.Instance.jm.inputVec;
            DataManager.Instance.applyInput({
                id:1,
                type:'ActorMove',
                direction:{
                    x,y
                },
                dt
            })
        }
    }

    onDestroy () {
        
    }

    
}
