import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserRoomService } from 'src/user-room/services/user-room.service';
import { JoinChatDto } from './dtos/join-chat.dto';
import { SearchUserDto } from './dtos/search-user.dto';
import { CreateMessageDto } from './dtos/create-message.dto';
import { UsersService } from 'src/users/services/users.service';
import { RoomsService } from 'src/rooms/services/rooms.service';
import { MessagesService } from 'src/messages/services/messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class Gateway {
  constructor(
    private userRoomService: UserRoomService,
    private usersService: UsersService,
    private roomsService: RoomsService,
    private messagesService: MessagesService,
  ) {}

  @SubscribeMessage('search')
  async onSearch(
    @MessageBody() searchUserDto: SearchUserDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const data = await this.userRoomService.findRoom(searchUserDto);

    if (!data?.room) {
      return;
    }

    client.emit('createChat', {
      roomId: data?.room.id,
      userToAdd: {
        name: data?.userToAdd?.name,
        id: data?.userToAdd?.id,
      },
    });
  }

  @SubscribeMessage('join')
  async onJoin(
    @MessageBody() joinChatDto: JoinChatDto,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const room = await this.roomsService.findById(joinChatDto.roomId);

    if (!room) {
      return null;
    }

    console.log(`${socket.id} JOINED ${room.id}`);
    socket.join(room.id);
  }

  @SubscribeMessage('createMessage')
  async onCreateMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const [to, from] = await Promise.all([
      this.usersService.findById(createMessageDto.to),
      this.usersService.findById(createMessageDto.from),
    ]);
    if (!to || !from) {
      return;
    }

    const room = await this.roomsService.findById(createMessageDto.roomId);
    if (!room) {
      return;
    }
    await this.messagesService.createMessage({
      from,
      to,
      message: createMessageDto.message,
      room,
    });

    socket.to(room.id).emit('recieveMessage', {
      to: to.id,
      from: from.id,
      message: createMessageDto.message,
      roomId: room.id,
    });
  }
}
