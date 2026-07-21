import { Document, Model } from "mongoose";
import { AbstractRepository } from "../abstract.repository";
import { SubCategory } from "./sub-category.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

type TsubCategory= SubCategory & Document;
@Injectable()
export class SubCategoryRepository extends AbstractRepository<TsubCategory>{
    constructor(@InjectModel(SubCategory.name) subCategoryModel:Model<TsubCategory>){
        super(subCategoryModel);
    }
}