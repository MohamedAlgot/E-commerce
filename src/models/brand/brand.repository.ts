import { Document, Model } from "mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Brand } from "./brand.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

type Tbrand= Brand & Document;
@Injectable()
export class BrandRepository extends AbstractRepository<Tbrand>{
    constructor(@InjectModel(Brand.name) categoryModel:Model<Tbrand>){
        super(categoryModel)
    }
}