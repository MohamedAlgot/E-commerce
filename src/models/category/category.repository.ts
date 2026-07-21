import { Document, Model } from "mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Category } from "./category.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

type Tcategory= Category & Document;
@Injectable()
export class CategoryRepository extends AbstractRepository<Tcategory>{
    constructor(@InjectModel(Category.name) categoryModel:Model<Tcategory>){
        super(categoryModel)
    }
}