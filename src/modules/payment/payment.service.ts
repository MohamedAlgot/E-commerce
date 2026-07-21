import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KashierService {
  constructor(private readonly configService:ConfigService) {}

  async createPaymentSession(order:any) {
    const apiKey = this.configService.getOrThrow<string>(
        'Kashier.api_key'
    );
    const secretKey= this.configService.getOrThrow<string>(
        'Kashier.secret_key'
    )
    const merchantId= this.configService.getOrThrow<string>(
        'Kashier.merchantId'
    )
    
  const body = {
  expireAt:new Date(Date.now()+1000*60*60).toISOString(),
  merchantId: merchantId,
  // maxFailureAttempts: 3,
  paymentType: "credit",
  amount: String(order.total),
  currency: "EGP",
  order: order._id,
  merchantRedirect: 'https://your-store.com/payment/success',
  display: "en",
  type: "one-time",
  allowedMethods: "card,wallet",
  failureRedirect: false,
  description:"pay for e-commerse app",
  customer: {reference:"amiralgotali@gmail.com"},
  interactionSource: "ECOMMERCE",
  enable3DS: true,
  serverWebhook:'https://illusive-backing-crazily.ngrok-free.dev/order/webhook/kashier',// todo
    }

    const res = await fetch("https://test-api.kashier.io/v3/payment/sessions",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'api-key':apiKey,
        Authorization:secretKey
      },
      body:JSON.stringify(body),
    });
    const kashierRes = await res.json();

if (!res.ok) {
  throw new BadGatewayException({
    message: 'Failed to create Kashier payment session',
    kashierError: kashierRes,
  });
}
    
    
    return kashierRes;
  }
}
