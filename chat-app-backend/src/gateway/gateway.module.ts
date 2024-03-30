import { Module } from '@nestjs/common';
import { UserRoomModule } from 'src/user-room/user-room.module';
import { Gateway } from './gateway';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [UserRoomModule, MessagesModule],
  providers: [Gateway],
})
export class GatewayModule {}
