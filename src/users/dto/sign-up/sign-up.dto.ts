import { IsEmail } from 'class-validator';
import { DtoProperty } from 'src/shared';

export class SignUpPayloadDto {
  @DtoProperty()
  @IsEmail()
  email: string;

  @DtoProperty()
  name: string;

  @DtoProperty()
  password: string;
}
