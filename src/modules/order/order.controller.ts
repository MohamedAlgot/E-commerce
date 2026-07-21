import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IsPublic } from 'src/common/decorators/public.decorators';
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

 @Post()
 async create(@Body() createOrderDto: CreateOrderDto) {
    const createdOrder=await this.orderService.create(createOrderDto);
    return{
      message:"created order successfully",
      success:true,
      data:{
        createdOrder
      }
    }
}
  

  @IsPublic()
  @Post('webhook/kashier')
  @HttpCode(200)
  async kashierWebhook(@Body() body: any) {
    return this.orderService.handleKashierWebhook(body);
    console.log(body);
    
  }


  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
