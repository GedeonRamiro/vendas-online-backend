import { ReturnUserDto } from 'src/user/dtos/ReturnUser.dto';

export interface ReturnLoginDto {
  user: ReturnUserDto;
  accessToken: string;
}
