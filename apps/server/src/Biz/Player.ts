import { Connection } from "../Core";


export class Player {
    id: number
    nickName: string
    connection: Connection
    rid: number
    constructor({ id, nickName, connection }: Pick<Player, 'id' | 'nickName' | 'connection'>) {
        this.id = id
        this.nickName = nickName
        this.connection = connection
    }
}