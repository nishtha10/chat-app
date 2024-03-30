import { IsNotEmpty } from 'class-validator';

export class GetChatListDto {
  @IsNotEmpty()
  userId: string;
}
