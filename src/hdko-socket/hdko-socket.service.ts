import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface ConnectedClientsHDKO{
    [id: string]: {
        socket: Socket,
        user: User,
    }
}


@Injectable()
export class HdkoSocketService {

    private connectedClientsHDKO: ConnectedClientsHDKO = {};

    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}


    async registerCLient(client: Socket,userId:string) {

        const user = await this.userRepository.findOneBy({id:userId});

        if(!user) throw new Error('User not found');
        if(!user.isActive) throw new Error('User not active');

        this.checkUserConnection(user);

        this.connectedClientsHDKO[client.id] = {
            socket: client,
            user: user,
        };
    }

    removeCLient(clientId: string) {
        delete this.connectedClientsHDKO[clientId];
    }

    getConnectedClientsHDKO() : string[] {
        return Object.keys(this.connectedClientsHDKO);
    }

    getUserFullName(socketId:string){
        return this.connectedClientsHDKO[socketId].user.fullName;
    }

    private checkUserConnection(user:User){
        for(const clientId of Object.keys(this.connectedClientsHDKO)){
          const connectedClient = this.connectedClientsHDKO[clientId];

            if(connectedClient.user.id === user.id){
                connectedClient.socket.disconnect();
                break;
            }

        }
    }


}
