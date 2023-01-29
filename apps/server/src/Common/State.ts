import { IVec2 } from "cc"
import { InputTypeEnum } from "../Enum"

/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-27 16:04:16
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-27 16:59:38
 * @FilePath: \cocos-nodejs-io-game-start-demo-master\apps\client\assets\Scripts\Common\State.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
interface posVec2{
    x:number,
    y:number
}

export interface IActor{
    type:string,
    id:number,
    weaponType:string,
    bulletType:string,
    position:posVec2,
    direction:posVec2
}

export interface IBullet{
    id:number,
    type:string,
    owner:number,
    position:posVec2,
    direction:posVec2
}

export interface ISate {
    actors:IActor[],
    bullets:IBullet[],
    nextShoot:number
}

export type IClientInput = IWeaponShoot | IActorMove

export interface IActorMove{
    id:number,
    type:string,
    direction:posVec2,
    dt:number
}

export interface IWeaponShoot{
    owner:number,
    type:InputTypeEnum.ActorShoot,
    direction:posVec2,
    position:posVec2
}

export enum EnityEnum{
    EnityEnum_ACTOR1 = 'Actor1',
    EnityEnum_ACTOR2 = 'Actor2',
    EnityEnum_Weapon1 = 'Weapon1',
    EnityEnum_MAP = 'Map',
    EnityEnum_Bullet1 = 'EnityEnum_Bullet1'
}