import { Module } from '@nestjs/common';
import { UserRoomService } from './services/user-room.service';
import { UsersModule } from 'src/users/users.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { ChatController } from './controllers/chat.controller';

@Module({
  imports: [UsersModule, RoomsModule],
  providers: [UserRoomService],
  exports: [UserRoomService, UsersModule, RoomsModule],
  controllers: [ChatController],
})
export class UserRoomModule {}
