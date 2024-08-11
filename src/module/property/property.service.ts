import { Property } from "@entity/property.entity";
import { PropertyRepository } from "./property.repossitory";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { PropertyCreateReqDto } from "./dto/req/property-create-req.dto";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class PropertyService implements OnModuleInit{
    constructor(
        @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
        private readonly propertyRepository: PropertyRepository
    ) {}

    async onModuleInit() {
        this.kafkaClient.subscribeToResponseOf('nestjs-property-topic');
        await this.kafkaClient.connect();
    }

    async searchProperties(): Promise<Property[]> {
        return this.propertyRepository.find();
    }
    
    async createProperty(property: PropertyCreateReqDto): Promise<Property> {
        const savedProperty = await this.propertyRepository.saveEntity(property);
        await this.sendMessagePropetyChanged(savedProperty);
        return savedProperty;
    }
    
    async getPropertyById(id: number): Promise<Property> {
        const  property = await this.propertyRepository.getById(id);
        this.sendMessagePropetyChanged(property);
        return property;
    }
    
    async updateProperty(property: PropertyCreateReqDto): Promise<Property> {
        return this.propertyRepository.saveEntity(property);
    }
    
    async deleteProperty(id: string): Promise<void> {
        await this.propertyRepository.delete(id);
    }

    private async sendMessagePropetyChanged(propety: Property) {
        //log message to kafka
        this.kafkaClient.emit('nestjs-property-topic', JSON.stringify(propety))
    }
}