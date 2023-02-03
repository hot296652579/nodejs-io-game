/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-27 11:36:50
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-28 16:08:09
 * @FilePath: \cocos-nodejs-io-game-start-demo-master\apps\client\assets\Scripts\UI\PlayerItem.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, Input, input, EventTouch, Vec2, UITransform, Label } from 'cc';
import { EventEnum, IPlayer, IRoom } from '../Common';
import EventManager from '../Global/EventManager';
const { ccclass, property } = _decorator;

@ccclass('RoomItem')
export class RoomItem extends Component {
    id: number
    init({ id, players }: IRoom) {
        this.id = id
        const lable = this.node.getComponent(Label)
        lable.string = `房间id:${id}`
        this.node.active = true
    }

    onLoad() {

    }

    handlerClickJoin() {
        EventManager.Instance.emit(EventEnum.RoomJoin, this.id)
    }

    onDestroy() {

    }
}

