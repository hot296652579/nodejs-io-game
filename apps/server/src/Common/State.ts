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
    id:number,
    position:posVec2,
    direction:posVec2
}


export interface ISate {
    actors:IActor[]
}

export interface IActorMove{
    id:number,
    type:string,
    direction:posVec2,
    dt:number
}