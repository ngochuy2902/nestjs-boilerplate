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
import { UserRes } from './dto/res/user.res';
import { RolesGuard } from '@security/guard/role.guard';
import { Roles } from '@security/decorator/role.decorator';
import { RoleEnum } from '@share/enum/role.enum';
import { JwtGuard } from '@security/guard/jwt.guard';
import { FetchUserReq } from './dto/req/fetch-user.req';
import { UserCreateReq } from './dto/req/user-create.req';
import { UserChangePasswordReq } from './dto/req/user-change-password.req';
import { Ctx } from '@security/request-context/req-context.decorator';
import { CtxReq } from '@security/request-context/request-context.dto';
import { ApiKeyName, ApiOkPaginationRes } from '@config/swagger.config';
import { PaginationRes } from '@share/page/response/pagination.res';

@Controller('users')
@ApiTags('User')
@UseGuards(JwtGuard, RolesGuard)
@Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
export class UserController {
  constructor(private readonly userBloc: UserBloc) {}

  @Post()
  @ApiSecurity(ApiKeyName)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Number,
  })
  async createUser(@Ctx() ctx: CtxReq, @Body() req: UserCreateReq): Promise<number> {
    return this.userBloc.createUser(ctx, req);
  }

  @Get()
  @ApiSecurity(ApiKeyName)
  @ApiOperation({ summary: 'Fetch all users' })
  @ApiOkPaginationRes(UserRes)
  async searchUsers(@Query() req: FetchUserReq): Promise<PaginationRes<UserRes>> {
    const data = await this.userBloc.searchUsers(req);
    return data.map((user) => plainToInstance(UserRes, user, { excludeExtraneousValues: true }));
  }

  @Get('me')
  @ApiSecurity(ApiKeyName)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.USER)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserRes,
  })
  async getCurrentUserProfile(@Ctx() ctx: CtxReq): Promise<UserRes> {
    const user = await this.userBloc.getCurrentUserProfile(ctx.userId);

    return plainToClass(UserRes, user, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @ApiSecurity(ApiKeyName)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserRes,
  })
  async getUserById(@Param('id') id: number): Promise<UserRes> {
    const user = await this.userBloc.getById(id);

    return plainToClass(UserRes, user, {
      excludeExtraneousValues: true,
    });
  }

  @Put('change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiSecurity(ApiKeyName)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.USER)
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async changePassword(
    @Ctx() ctx: CtxReq,
    @Body() passwordReq: UserChangePasswordReq,
  ): Promise<void> {
    await this.userBloc.changePassword(
      ctx.userId,
      passwordReq.currentPassword,
      passwordReq.newPassword,
    );
  }
}
