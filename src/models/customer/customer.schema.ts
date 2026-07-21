import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { genderEnum } from "src/common/enum/gender.enum";

@Schema({timestamps:true,discriminatorKey:"role"})
export class Customer{
    userName!:string;
    email!:string;
    password!:string;
    phoneNumer!:string;
    Age!:string;
    @Prop({type:String,enum:genderEnum})
    gender!:genderEnum;
}


export const CustomerSchema = SchemaFactory.createForClass(Customer);

