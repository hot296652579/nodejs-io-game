/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-27 17:13:19
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-28 16:49:36
 * @FilePath: \node-io-game\apps\client\assets\Scripts\Enum\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export enum FsmParamTypeEnum {
  Number = "Number",
  Trigger = "Trigger",
}

export enum ParamsNameEnum {
  Idle = "Idle",
  Run = "Run",
  Attack = "Attack",
}

export enum EntityStateEnum {
  Idle = "Idle",
  Run = "Run",
  Attack = "Attack",
}

export enum PrefabPathEnum {
  Map = 'prefab/Map',
  Actor1 = 'prefab/Actor',
  Weapon1 = 'prefab/Weapon1',
  Bullet2 = 'prefab/Bullet2',
  Explosion = 'prefab/Explosion'
}

export enum TexturePathEnum {
  Actor1Idle = 'texture/actor/actor1/idle',
  Actor1Run = 'texture/actor/actor1/run',
  Weapon1Idle = 'texture/weapon/weapon1/idle',
  Weapon1Attack = 'texture/weapon/weapon1/attack',
  Bullet2Idle = 'texture/bullet/bullet2',
  ExplosionIdle = 'texture/explosion',
}


export enum EventEnum {
  WeaponShoot = 'WeaponShoot',
  BulletExplosion = 'BulletExplosion',
  BulletBorn = 'BulletBorn',

  MsgClientSync = 'MsgClientSync',
  MsgServerSync = 'MsgServerSync',
  MsgPlayerLogin = 'MsgPlayerLogin'
}

export enum InputTypeEnum {
  ActorMove = 'ActorMove',
  ActorShoot = 'ActorShoot',
  TimePast = 'TimePast'
}


export enum SceneEnum {
  Login = 'Login',
  Battle = 'Battle'
}

