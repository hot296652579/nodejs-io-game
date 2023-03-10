/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-28 15:43:18
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-28 16:53:34
 * @FilePath: \node-io-game\apps\client\assets\Scripts\Enum\WeaponStateMachine.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Animation, AnimationClip } from "cc";
import State from "../Base/State";
import StateMachine, { getInitParamsTrigger } from "../Base/StateMachine"
import { EnityEnum } from "../Common";
import { WeaponManager } from "../Manager/WeaponManager";
// import { EnityEnum } from '../Common/EnityEnum';
import { EntityStateEnum, ParamsNameEnum } from "./index";
const { ccclass } = _decorator;

@ccclass("WeaponStateMachine")
export class WeaponStateMachine extends StateMachine {
  init(type: EnityEnum) {
    this.type = type;
    this.animationComponent = this.node.addComponent(Animation);
    this.initParams();
    this.initStateMachines();
    this.initAnimationEvent();
  }

  initParams() {
    this.params.set(ParamsNameEnum.Idle, getInitParamsTrigger());
    this.params.set(ParamsNameEnum.Attack, getInitParamsTrigger());
  }

  initStateMachines() {
    
    this.stateMachines.set(ParamsNameEnum.Idle, new State(this, `${this.type}${EntityStateEnum.Idle}`, AnimationClip.WrapMode.Loop));
    this.stateMachines.set(ParamsNameEnum.Attack, new State(this, `${this.type}${EntityStateEnum.Attack}`, AnimationClip.WrapMode.Normal));
  }

  initAnimationEvent() {
    this.animationComponent.on(Animation.EventType.FINISHED, this.onAnimationFinished, this);
  }

  onAnimationFinished(){
    if(this.animationComponent.defaultClip.name.includes(EntityStateEnum.Attack)){
      this.node.getComponent(WeaponManager).state = EntityStateEnum.Idle
    }
  }

  run() {
    switch (this.currentState) {
      case this.stateMachines.get(ParamsNameEnum.Idle):
      case this.stateMachines.get(ParamsNameEnum.Attack):
        if (this.params.get(ParamsNameEnum.Attack).value) {
          this.currentState = this.stateMachines.get(ParamsNameEnum.Attack);
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
