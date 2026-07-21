import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { PaymentMethodEnum } from "src/common/enum/payment.enum";



export class CreateOrderDto {
    @IsMongoId()
    @IsNotEmpty()
    address!:string;


    
    @IsString()
    @IsEnum(PaymentMethodEnum)
    paymentMethod!:PaymentMethodEnum;

    @IsMongoId()
    @IsNotEmpty()
    product!:string;

    @IsNumber()
    @IsPositive()
    quntity!:number
}
