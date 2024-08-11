import { Property } from "@entity/property.entity";
import { Post, Body, Get, Param, Put, Delete, Controller, UseGuards, HttpStatus } from "@nestjs/common";
import { PropertyService } from "./property.service";
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "@security/guard/jwt.guard";
import { RolesGuard } from "@security/guard/role.guard";
import { ApiKeyName } from "@config/swagger.config";
import { RoleType } from "@module/user/dto/enum/role-type";
import { Roles } from "@security/decorator/role.decorator";
import { Ctx } from "@security/request-context/req-context.decorator";
import { CtxReq } from "@security/request-context/request-context.dto";
import { PropertyCreateReqDto } from "./dto/req/property-create-req.dto";

@Controller('property')
@ApiTags('Property')
@UseGuards(JwtGuard, RolesGuard)
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) {}
    
    @Post()
    @Roles(RoleType.ADMIN)
    @ApiSecurity(ApiKeyName)
    @ApiOperation({ summary: 'Create property' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: Property,
    })
    async createProperty(@Ctx() ctx: CtxReq, @Body() property: PropertyCreateReqDto): Promise<Property> {
        return this.propertyService.createProperty(property);
    }

    @Get('')
    @Roles(RoleType.ADMIN)
    @ApiSecurity(ApiKeyName)
    @ApiOperation({ summary: 'Fetch all properties' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: [Property],
    })
    async searchProperties(): Promise<Property[]> {
        return this.propertyService.searchProperties();
    }
    
    @Get(':id')
    @Roles(RoleType.ADMIN)
    @ApiSecurity(ApiKeyName)
    @ApiOperation({ summary: 'Get property by id' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Property,
    })
    async getPropertyById(@Param('id') id: number): Promise<Property> {
        return this.propertyService.getPropertyById(id);
    }
    
    @Put()
    @Roles(RoleType.ADMIN)
    @ApiSecurity(ApiKeyName)
    @ApiOperation({ summary: 'Update property' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Property,
    })
    async updateProperty(@Ctx() ctx: CtxReq, @Body() property: PropertyCreateReqDto): Promise<Property> {
        return this.propertyService.updateProperty(property);
    }
    
    @Delete(':id')
    @Roles(RoleType.ADMIN)
    @ApiSecurity(ApiKeyName)
    @ApiOperation({ summary: 'Delete property' })
    @ApiResponse({
        status: HttpStatus.OK,
    })
    async deleteProperty(@Param('id') id: string): Promise<void> {
        return this.propertyService.deleteProperty(id);
    }
}