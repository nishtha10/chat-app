import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  roomId: string;
}
