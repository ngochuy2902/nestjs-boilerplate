import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UserResDto } from '../dto/response/user/user-res.dto';
import { RolesGuard } from '../security/guard/role.guard';
import { Roles } from '../security/decorator/role.decorator';
import { RoleType } from '../enum/role-type';
import { JwtGuard } from '../security/guard/jwt.guard';
import { UserFetchReqDto } from '../dto/request/user/user-fetch-req.dto';
import paginationUtil from '../util/pagination.util';
import { PaginationResDto } from '../dto/response/pagination-res.dto';
import { UserCreateReqDto } from '../dto/request/user/user-create-req.dto';
import { UserChangePasswordReqDto } from '../dto/request/user/user-change-password-req.dto';

@Controller('users')
@ApiTags('User')
@UseGuards(JwtGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserResDto,
  })
  async createUser(@Body() userCreateReq: UserCreateReqDto): Promise<number> {
    const { email, password, name, roles } = userCreateReq;
    return this.userService.createUser(email, password, name, roles);
  }

  @Get('')
  @Roles(RoleType.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginationResDto,
  })
  async fetchAllUsers(@Query() req: UserFetchReqDto): Promise<PaginationResDto> {
    const query = new UserFetchReqDto(req);
    const { users, count } = await this.userService.fetchAll(query);
    return paginationUtil.getPageResponse(
      plainToInstance(UserResDto, users, {
        excludeExtraneousValues: true,
      }),
      query,
      count,
    );
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResDto,
  })
  async getCurrentUserProfile(): Promise<UserResDto> {
    const user = await this.userService.getCurrentUserProfile();

    return plainToClass(UserResDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @Roles(RoleType.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResDto,
  })
  async getUserById(@Param('id') id: number): Promise<UserResDto> {
    const user = await this.userService.getById(id);

    return plainToClass(UserResDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Put('change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async changePassword(@Body() passwordReq: UserChangePasswordReqDto): Promise<void> {
    await this.userService.changePassword(passwordReq.currentPassword, passwordReq.newPassword);
  }
}
