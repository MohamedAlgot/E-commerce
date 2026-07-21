import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/common/enum/discountType.enum";

@Schema({ timestamps: true, discriminatorKey:"role" })
export class User{
    @Prop({type:String,require:true})
    UserName!:string;

    @Prop({type:String,require:true})
    email!:string;

    @Prop({type:String})
    phoneNumber!:string;

    @Prop({type:String,require:true})
    password!:string;

    @Prop({type:String})
    Age!:number;

    @Prop({type:String})
    role!:Role

}



export const UserSchema = SchemaFactory.createForClass(User);