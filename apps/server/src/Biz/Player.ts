import { Connection } from "../Core";


export class Player {
    id: number
    nickName: string
    connection: Connection
    rid: string
    constructor({ id, nickName, connection }: Pick<Player, 'id' | 'nickName' | 'connection'>) {
        this.id = id
        this.nickName = nickName
        this.connection = connection
    }
}