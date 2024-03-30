import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserRoomModule } from 'src/user-room/user-room.module';

@Module({
  imports: [UserRoomModule],
  controllers: [AuthController],
})
export class AuthModule {}
