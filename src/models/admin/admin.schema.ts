import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true,discriminatorKey:"role"})
export class Admin{
    userName!:string;
    email!:string;
    password!:string;
    phoneNumer!:string;
    Age!:string;
    @Prop({type:String,require:true})
    isActive!:Boolean;
}


export const AdminSchema = SchemaFactory.createForClass(Admin);

