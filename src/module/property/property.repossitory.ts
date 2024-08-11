// add code for property repository

import { DataSource, Repository } from 'typeorm';
import { Property } from '@entity/property.entity';
import { Injectable } from '@nestjs/common';
import { PropertyCreateReqDto } from './dto/req/property-create-req.dto';


@Injectable()
export class PropertyRepository extends Repository<Property> {

    constructor(private readonly dataSource: DataSource) {
        super(Property, dataSource.createEntityManager());
    }

    async saveEntity(property: PropertyCreateReqDto): Promise<Property> {
        return this.save(this.create(property));
    }

    async getById(id: number): Promise<Property> {
        return this.findOneBy({ id });
    }
}