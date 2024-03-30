import { Body, Controller, Post } from '@nestjs/common';
import { GetChatListDto } from 'src/user-room/dtos/get-chat-list.dto';
import { HistoryList } from '../types';
import { MessagesService } from '../services/messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}
  @Post('history')
  async history(
    @Body() getChatListDto: GetChatListDto,
  ): Promise<HistoryList[]> {
    return this.messagesService.getHistoryList(getChatListDto.userId);
  }
}
