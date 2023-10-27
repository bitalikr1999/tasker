import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SignUpPayloadDto, TokenPairDto } from 'src/users/dto';
import { AuthService } from 'src/users/services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'User created', type: TokenPairDto })
  @Post('sign-up')
  public signUp(@Body() dto: SignUpPayloadDto) {
    return this.authService.signUp(dto);
  }
}
