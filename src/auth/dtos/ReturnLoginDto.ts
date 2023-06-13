import { ReturnUserDto } from '../../user/dtos/ReturnUser.dto';

export interface ReturnLoginDto {
  user: ReturnUserDto;
  accessToken: string;
}
