import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterInputDto } from '../user/dto/register.dto';
import { Users } from 'src/entities/users.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  @ApiOperation({ summary: 'register' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UsePipes(new ValidationPipe())
  register(@Body() registerInputDto: RegisterInputDto): Promise<Users> {
    return this.authService.register(registerInputDto);
  }
}
