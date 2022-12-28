/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-28 15:43:18
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-28 16:53:34
 * @FilePath: \node-io-game\apps\client\assets\Scripts\Enum\ActorStateMachine.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Animation, AnimationClip } from "cc";
import State from "../Base/State";
import StateMachine, { getInitParamsTrigger } from "../Base/StateMachine"
import { EnityEnum } from '../Common/EnityEnum';
import { EntityStateEnum, ParamsNameEnum } from "../Enum/index";
const { ccclass } = _decorator;

@ccclass("ActorStateMachine")
export class ActorStateMachine extends StateMachine {
  init(type: EnityEnum) {
    this.type = type;
    this.animationComponent = this.node.addComponent(Animation);
    this.initParams();
    this.initStateMachines();
    this.initAnimationEvent();
  }

  initParams() {
    this.params.set(ParamsNameEnum.Idle, getInitParamsTrigger());
    this.params.set(ParamsNameEnum.Run, getInitParamsTrigger());
  }

  initStateMachines() {
    this.stateMachines.set(ParamsNameEnum.Idle, new State(this, `${this.type}${EntityStateEnum.Idle}`, AnimationClip.WrapMode.Loop));
    this.stateMachines.set(ParamsNameEnum.Run, new State(this, `${this.type}${EntityStateEnum.Run}`, AnimationClip.WrapMode.Loop));
  }

  initAnimationEvent() {}

  run() {
    switch (this.currentState) {
      case this.stateMachines.get(ParamsNameEnum.Idle):
      case this.stateMachines.get(ParamsNameEnum.Run):
        if (this.params.get(ParamsNameEnum.Run).value) {
          this.currentState = this.stateMachines.get(ParamsNameEnum.Run);
        } else if (this.params.get(ParamsNameEnum.Idle).value) {
          this.currentState = this.stateMachines.get(ParamsNameEnum.Idle);
        } else {
          this.currentState = this.currentState;
        }
        break;
      default:
        this.currentState = this.stateMachines.get(ParamsNameEnum.Idle);
        break;
    }
  }
}
