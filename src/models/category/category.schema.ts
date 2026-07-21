import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({timestamps:true})
export class Category{

    @Prop({type:String,require:true,})
    name!:string;

    @Prop({type:String,require:true,})
    slug!:string;

    @Prop({type:String})
    logo!:string;

    @Prop({type:String})
    folderId!:string
}


export const categorySchema=SchemaFactory.createForClass(Category);