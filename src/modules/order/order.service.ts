import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductRepository } from 'src/models/product/product.repository';
import { OrderRepository } from 'src/models/order/order.repository';
import { PaymentMethodEnum } from 'src/common/enum/payment.enum';
import { OrederFactoryService } from './factory/order.factory';
import { ConfigService } from '@nestjs/config';
import { KashierService } from '../payment/payment.service';
import { OrderStatusEnum } from 'src/common/enum/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
    private readonly orderFactoryServics: OrederFactoryService,
    private readonly configService: ConfigService,
    private readonly kashierService: KashierService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    //1. check product exist [case cart >>check products exitence ]
    const productExist = await this.productRepository.getOne({
      _id: createOrderDto.product,
    });

    if (!productExist) {
      throw new NotFoundException('product Not Found');
    }
    //2. check product stock
    if (createOrderDto.quntity > productExist.stock) {
      throw new BadRequestException(
        `The requested quantity is unavailable. Only ${productExist.stock} are currently in stock.`,
      );
    }
    //3. todo:check address related user

    //prepare data
    const createdOrder = this.orderFactoryServics.creatOrder(
      createOrderDto,
      productExist,
    );

    if (
      createOrderDto.paymentMethod == PaymentMethodEnum.COD &&
      createdOrder.total > 20000
    ) {
      throw new BadRequestException('cannot proceed this order with COD');
    }

    //4. if paymentMethod == COD
    //5. creat order into DB >> orderStatus == 'placed'
    const order = await this.orderRepository.create(createdOrder);
    if (createOrderDto.paymentMethod === PaymentMethodEnum.COD) {
      return order;
    }
    //6. if vise >> payment gateway integration
    if (createOrderDto.paymentMethod === PaymentMethodEnum.Credit) {
      const payment = await this.kashierService.createPaymentSession(order);
      return {
        order: order,
        payment: {
          sessionUrl: payment.sessionUrl,
          status: payment.status,
          expireAt: payment.expireAt,
        },
      };
    }
  }

  async handleKashierWebhook(body: any) {
    console.log('Data from Kashier:', body);

    const paymentData = body.data;
    const orderId = paymentData.merchantOrderId;

    if (paymentData.status === 'SUCCESS') {
      return await this.orderRepository.updateOne(
        { _id: orderId },
        {
          status: OrderStatusEnum.Paid,
        },
      );
    }

    return {
      received: true,
      data: body,
    };
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
