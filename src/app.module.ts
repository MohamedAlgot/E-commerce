import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ShareModule } from './shared/share.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import configurtion from './config/configurtion';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configurtion] }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('database').url,
        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () => console.log('connected'));
          return connection;
        },
      }),
    }),
    ProductModule,
    BrandModule,
    CategoryModule,
    ShareModule,
    SubCategoryModule,
    OrderModule,
    AddressModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
