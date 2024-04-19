import { Controller, Get, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/vendors/guard/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiSecurity('basic')
  @ApiBearerAuth()
  @MessagePattern({ cmd: 'get_hello' })
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: [UserDto],
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseGuards(JwtAuthGuard)
  getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }
}
