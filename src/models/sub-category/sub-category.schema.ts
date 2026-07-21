import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Types } from "mongoose";

@Schema({timestamps:true})
export class SubCategory {

    @Prop({type:String,require:true})
    name!:string;

    @Prop({type:String,require:true})
    slug!:string;

    @Prop({type:String})
    logo!:string;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Category"})
    categoryId!:Types.ObjectId
}


const categorySchema=SchemaFactory.createForClass(SubCategory);