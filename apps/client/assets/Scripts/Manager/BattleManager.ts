/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-27 11:36:50
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-28 17:12:01
 * @FilePath: \cocos-nodejs-io-game-start-demo-master\apps\client\assets\Scripts\UI\JoyStickManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, Input, input, EventTouch, Vec2, UITransform, Prefab, instantiate, SpriteFrame } from 'cc';
import { EnityEnum } from '../Common';

import { InputTypeEnum, PrefabPathEnum, TexturePathEnum } from '../Enum';
import { ResourceManager } from '../Global/ResourceManager';
import { JoyStickManager } from '../UI/JoyStickManager';
import { ActorManager } from './ActorManager';
import { BulletManager } from './BulletManager';
import { DataManager } from './DataManager';
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {
    @property(Node)
    stage:Node = null;

    @property(Node)
    joyStick:Node = null;

    @property(Node)
    actor:Node = null;

    showRender:boolean = false;

    onLoad () {
        this.stage.removeAllChildren();
       DataManager.Instance.jm = this.joyStick.getComponent(JoyStickManager);
       DataManager.Instance.UIStage = this.stage;
    }

    async start(){
        await this.loadRes()
        this.initMap()

        this.showRender = true;
    }

    async loadRes(){
        const list = [];
        for (const type in PrefabPathEnum) {
            if (Object.prototype.hasOwnProperty.call(PrefabPathEnum, type)) {
                const prefab = await ResourceManager.Instance.loadRes(PrefabPathEnum[type],Prefab).then((prefab) =>{
                    DataManager.Instance.prefabeMap.set(type,prefab)

                })
                list.push(prefab) 
            }
        }

        for (const type in TexturePathEnum) {
            if (Object.prototype.hasOwnProperty.call(TexturePathEnum, type)) {
                const texture = await ResourceManager.Instance.loadDir(TexturePathEnum[type],SpriteFrame).then((sp) =>{
                    DataManager.Instance.textureMap.set(type,sp)

                })
                list.push(texture)
            }
        }

        await Promise.all(list)
    }

    initMap(){
        const p = DataManager.Instance.prefabeMap.get(EnityEnum.EnityEnum_MAP)
        const actor = instantiate(p)

        actor.setParent(this.stage)
    }

    update(dt){
        if(!this.showRender)
            return

        this.UIRender();
        this.UIRanderBullet();

        DataManager.Instance.applyInput({
            type:InputTypeEnum.TimePast,
            dt,
        })
    }

    UIRender(){
        const actors = DataManager.Instance.state.actors;
        for (const data of actors) {
            const {id,type} = data
            let am = DataManager.Instance.actorMap.get(id)
            if(!am){
                const p = DataManager.Instance.prefabeMap.get(type)
                const actor = instantiate(p)

                actor.setParent(this.stage)
                
                am = actor.getComponent(ActorManager)
                DataManager.Instance.actorMap.set(id,am)
                am.init(data)
            }else{
                am.render(data)
            }
        }
    }

    UIRanderBullet(){
        const bullets = DataManager.Instance.state.bullets;
        if(bullets.length <= 0)return;
        for (const data of bullets) {
            const {id,type} = data
            let bm = DataManager.Instance.bulletMap.get(id)
            if(!bm){
                const p = DataManager.Instance.prefabeMap.get(type)
                const bullet = instantiate(p)

                bullet.setParent(this.stage)
                
                bm = bullet.addComponent(BulletManager)
                DataManager.Instance.bulletMap.set(id,bm)
                bm.init(data)
            }else{
                bm.render(data)
            }
        }
    }

    onDestroy () {
        
    }

    
}

