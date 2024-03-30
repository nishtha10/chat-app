import { Body, Controller, Post } from '@nestjs/common';
import { GetChatListDto } from '../dtos/get-chat-list.dto';
import { ChatListResponse } from '../types';
import { UserRoomService } from '../services/user-room.service';

@Controller('chat')
export class ChatController {
  constructor(private userRoomService: UserRoomService) { }

  @Post('list')
  async list(
    @Body() getChatListDto: GetChatListDto,
  ): Promise<ChatListResponse[]> {
    return this.userRoomService.list(getChatListDto);
  }
}
