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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass, plainToInstance } from 'class-transformer';

import { UserBloc } from './user.bloc';
import { UserResDto } from './dto/res/user-res.dto';
import { RolesGuard } from '@security/guard/role.guard';
import { Roles } from '@security/decorator/role.decorator';
import { RoleType } from './dto/enum/role-type';
import { JwtGuard } from '@security/guard/jwt.guard';
import { UserFetchReqDto } from './dto/req/user-fetch-req.dto';
import { PaginationResDto } from '@share/dto/response/pagination-res.dto';
import { UserCreateReqDto } from './dto/req/user-create-req.dto';
import { UserChangePasswordReqDto } from './dto/req/user-change-password-req.dto';
import { PaginationUtil } from '@util/pagination.util';

@Controller('users')
@ApiTags('User')
@UseGuards(JwtGuard, RolesGuard)
export class UserController {
  constructor(private readonly userBloc: UserBloc) {}

  @Post()
  @Roles(RoleType.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Number,
  })
  async createUser(@Body() userCreateReq: UserCreateReqDto): Promise<number> {
    const { email, password, name, roles } = userCreateReq;
    return this.userBloc.createUser(email, password, name, roles);
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
    const { users, count } = await this.userBloc.fetchAll(query);
    return PaginationUtil.getPageResponse(
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
    const user = await this.userBloc.getCurrentUserProfile();

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
    const user = await this.userBloc.getById(id);

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
    await this.userBloc.changePassword(passwordReq.currentPassword, passwordReq.newPassword);
  }
}
