/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-27 11:36:50
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-28 16:54:36
 * @FilePath: \cocos-nodejs-io-game-start-demo-master\apps\client\assets\Scripts\UI\JoyStickManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, Input, input, EventTouch, Vec2, UITransform, Prefab, SpriteFrame } from 'cc';
import Singleton from '../Base/Singleton';
import { EnityEnum, IActorMove, IBullet, IClientInput, ISate, IWeaponShoot } from '../Common';
import { EventEnum, InputTypeEnum } from '../Enum';
import EventManager from '../Global/EventManager';

import { JoyStickManager } from '../UI/JoyStickManager';
import { ActorManager } from './ActorManager';
import { BulletManager } from './BulletManager';
const { ccclass, property } = _decorator;

const ACTOR_SPEED = 100;
const BULLET_SPEED = 600;

const STAGE_WIDTH = 960;
const STAGE_HEIGHT = 640;

const PLAYER_SIDE = 50;
const BULLET_SIDE = 10;

const ATTACK_MAGE = 10;

@ccclass('DataManager')
export class DataManager extends Singleton {

    UIStage: Node;
    jm: JoyStickManager;
    prefabeMap: Map<string, Prefab> = new Map<string, Prefab>();
    bulletMap: Map<number, BulletManager> = new Map<number, BulletManager>();
    actorMap: Map<number, ActorManager> = new Map<number, ActorManager>();
    textureMap: Map<string, SpriteFrame[]> = new Map<string, SpriteFrame[]>();
    MYSELF_PLAYERID = 1;
    frameId = 1;

    static get Instance() {
        return super.GetInstance<DataManager>();
    }

    state: ISate = {
        actors: [
            {
                id: 1,
                type: EnityEnum.EnityEnum_ACTOR1,
                weaponType: EnityEnum.EnityEnum_Weapon1,
                bulletType: EnityEnum.EnityEnum_Bullet2,
                hp: 100,
                position: {
                    x: 100,
                    y: 100
                },
                direction: {
                    x: 1,
                    y: 0
                }
            },
            {
                id: 2,
                type: EnityEnum.EnityEnum_ACTOR1,
                weaponType: EnityEnum.EnityEnum_Weapon1,
                bulletType: EnityEnum.EnityEnum_Bullet2,
                hp: 100,
                position: {
                    x: -100,
                    y: -100
                },
                direction: {
                    x: -1,
                    y: 0
                }
            }
        ],
        bullets: [],
        nextShoot: 1
    }

    applyInput(input: IClientInput) {
        switch (input.type) {
            case InputTypeEnum.ActorMove: {
                const { id, direction: { x, y }, dt } = input;

                const actor = this.state.actors.find((e) => e.id === id);
                actor.direction.x = x;
                actor.direction.y = y;
                actor.position.x += x * dt * ACTOR_SPEED;
                actor.position.y += y * dt * ACTOR_SPEED;
                break;
            }

            case InputTypeEnum.ActorShoot: {
                input = input as IWeaponShoot;
                const { owner, direction, position, type } = input;
                const bullet: IBullet = {
                    id: this.state.nextShoot++,
                    owner,
                    position,
                    direction,
                    type: this.actorMap.get(owner).bulletType
                }

                EventManager.Instance.emit(EventEnum.BulletBorn, owner)
                this.state.bullets.push(bullet)
                break;
            }

            case InputTypeEnum.TimePast: {
                const { dt } = input
                const { bullets, actors } = this.state


                for (let index = bullets.length - 1; index >= 0; index--) {
                    const bullet = bullets[index];

                    for (const actor of actors) {
                        if ((actor.position.x - bullet.position.x) ** 2 + (actor.position.y - bullet.position.y) ** 2 < (PLAYER_SIDE + BULLET_SIDE) ** 2) {
                            EventManager.Instance.emit(EventEnum.BulletExplosion, bullet.id,
                                {
                                    x: (actor.position.x + bullet.position.x) / 2,
                                    y: (actor.position.y + bullet.position.y) / 2
                                }
                            )
                            actor.hp -= ATTACK_MAGE
                            bullets.splice(index, 1)
                            break
                        }
                    }

                    if (Math.abs(bullet.position.x) > STAGE_WIDTH / 2 || Math.abs(bullet.position.y) > STAGE_HEIGHT / 2) {
                        EventManager.Instance.emit(EventEnum.BulletExplosion, bullet.id, { x: bullet.position.x, y: bullet.position.y })
                        bullets.splice(index, 1)
                        break
                    }
                }

                for (const bullet of bullets) {
                    bullet.position.x += bullet.direction.x * dt * BULLET_SPEED;
                    bullet.position.y += bullet.direction.y * dt * BULLET_SPEED;
                }
                break;
            }

            default:
                break;
        }


    }
}

