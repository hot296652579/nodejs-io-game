/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-27 11:36:50
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-27 15:43:21
 * @FilePath: \cocos-nodejs-io-game-start-demo-master\apps\client\assets\Scripts\UI\JoyStickManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, Input, input, EventTouch, Vec2, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JoyStickManager')
export class JoyStickManager extends Component {
    inputVec:Vec2 = Vec2.ZERO;
    @property(Node)
    body:Node = null;

    @property(Node)
    stick:Node = null;

    defaultVec2:Vec2 = null;

    radius:number = null;

    onLoad () {
        this.defaultVec2 = new Vec2(this.body.position.x,this.body.position.y);
        this.radius = this.body.getComponent(UITransform).contentSize.x / 2;

        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE,this.onTouchMove,this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onDestroy () {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart(event: EventTouch) {
        const pos = event.getUILocation();
        this.body.setPosition(pos.x,pos.y);
    }

    onTouchMove(event:EventTouch){
        const stickPos = new Vec2(event.getUILocation().x - this.body.position.x,event.getUILocation().y - this.body.position.y);
        if(stickPos.length() > this.radius){
            stickPos.multiplyScalar(this.radius / stickPos.length());
        }
        this.stick.setPosition(stickPos.x,stickPos.y);

        this.inputVec = stickPos.clone().normalize();
    }

    onTouchEnd(event: EventTouch){
        this.body.setPosition(this.defaultVec2.x,this.defaultVec2.y);
        this.stick.setPosition(0,0);
        this.inputVec = Vec2.ZERO;
    }
}

