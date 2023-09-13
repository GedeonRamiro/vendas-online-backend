import { ReturnUserDto } from '../../user/dtos/ReturnUser.dto';

export interface ReturnLoginDto {
  accessToken: string;
  user: ReturnUserDto;
}
