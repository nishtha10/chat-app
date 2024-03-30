import { IsNotEmpty } from 'class-validator';

export class SearchUserDto {
  @IsNotEmpty()
  query: string;

  @IsNotEmpty()
  loggedInId: string;
}
