import { Body, Controller, Post } from '@nestjs/common';
import { UserRoomService } from 'src/user-room/services/user-room.service';
import { LoginDto } from 'src/users/dtos/login.dto';
import { JoinResponse } from 'src/users/types';

@Controller('auth')
export class AuthController {
  constructor(private userRoomService: UserRoomService) {}
  @Post('login')
  async join(@Body() loginDto: LoginDto): Promise<JoinResponse> {
    return this.userRoomService.login(loginDto);
  }
}
