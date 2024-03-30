import { IsNotEmpty } from 'class-validator';

export class JoinChatDto {
  @IsNotEmpty()
  roomId: string;
}
