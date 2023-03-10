/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-27 11:36:50
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-28 16:08:09
 * @FilePath: \cocos-nodejs-io-game-start-demo-master\apps\client\assets\Scripts\UI\PlayerItem.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, Input, input, EventTouch, Vec2, UITransform, Label } from 'cc';
import { IPlayer } from '../Common';
const { ccclass, property } = _decorator;

@ccclass('PlayerItem')
export class PlayerItem extends Component {
    private lable: Label

    init({ nickName, rid, id }: IPlayer) {
        this.lable = this.node.getComponent(Label)
        this.lable.string = nickName
    }

    onLoad() {

    }

    onDestroy() {

    }
}

