import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { ParseIntPipe } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Param } from '@nestjs/common';

@ApiTags('User APIs')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiCreatedResponse({ type: UserDto })
  public async getUserInfoById(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<UserDto> {
    return await this.userService.getUserInfo(id);
  }
}
