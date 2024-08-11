import { Property } from "@entity/property.entity";
import { PropertyRepository } from "./property.repossitory";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PropertyCreateReqDto } from "./dto/req/property-create-req.dto";

@Injectable()
export class PropertyService {
    constructor(
        private readonly propertyRepository: PropertyRepository
    ) {}

    async searchProperties(): Promise<Property[]> {
        return this.propertyRepository.find();
    }
    
    async createProperty(property: PropertyCreateReqDto): Promise<Property> {
        return this.propertyRepository.saveEntity(property);
    }
    
    async getPropertyById(id: number): Promise<Property> {
        return this.propertyRepository.getById(id);
    }
    
    async updateProperty(property: PropertyCreateReqDto): Promise<Property> {
        return this.propertyRepository.saveEntity(property);
    }
    
    async deleteProperty(id: string): Promise<void> {
        await this.propertyRepository.delete(id);
    }
}