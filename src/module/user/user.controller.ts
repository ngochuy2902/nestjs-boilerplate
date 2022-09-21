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
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { plainToClass, plainToInstance } from 'class-transformer';

import { UserBloc } from './user.bloc';
import { UserResDto } from './dto/res/user-res.dto';
import { RolesGuard } from '@security/guard/role.guard';
import { Roles } from '@security/decorator/role.decorator';
import { RoleType } from './dto/enum/role-type';
import { JwtGuard } from '@security/guard/jwt.guard';
import { UserFetchReqDto } from './dto/req/user-fetch-req.dto';
import { PaginationResDto } from '@util/page/response/pagination-res.dto';
import { UserCreateReqDto } from './dto/req/user-create-req.dto';
import { UserChangePasswordReqDto } from './dto/req/user-change-password-req.dto';
import { Ctx } from '@security/request-context/req-context.decorator';
import { CtxReq } from '@security/request-context/request-context.dto';
import { ApiKeyName } from '@config/swagger.config';

@Controller('users')
@ApiTags('User')
@UseGuards(JwtGuard, RolesGuard)
export class UserController {
  constructor(private readonly userBloc: UserBloc) {}

  @Post()
  @Roles(RoleType.ADMIN)
  @ApiSecurity(ApiKeyName)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Number,
  })
  async createUser(@Ctx() ctx: CtxReq, @Body() req: UserCreateReqDto): Promise<number> {
    return this.userBloc.createUser(ctx, req);
  }

  @Get('')
  @Roles(RoleType.ADMIN)
  @ApiSecurity(ApiKeyName)
  @ApiOperation({ summary: 'Fetch all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginationResDto,
  })
  async searchUsers(@Query() req: UserFetchReqDto): Promise<PaginationResDto> {
    const query = new UserFetchReqDto(req);
    const data = await this.userBloc.searchUsers(query);
    return data.map((user) => plainToInstance(UserResDto, user, { excludeExtraneousValues: true }));
  }

  @Get('me')
  @ApiSecurity(ApiKeyName)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResDto,
  })
  async getCurrentUserProfile(@Ctx() ctx: CtxReq): Promise<UserResDto> {
    const user = await this.userBloc.getCurrentUserProfile(ctx.userId);

    return plainToClass(UserResDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @Roles(RoleType.ADMIN)
  @ApiSecurity(ApiKeyName)
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
  @ApiSecurity(ApiKeyName)
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async changePassword(
    @Ctx() ctx: CtxReq,
    @Body() passwordReq: UserChangePasswordReqDto,
  ): Promise<void> {
    await this.userBloc.changePassword(
      ctx.userId,
      passwordReq.currentPassword,
      passwordReq.newPassword,
    );
  }
}
