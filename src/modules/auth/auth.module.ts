import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ShareModule } from 'src/shared/share.module';
import { UserMongoModule } from 'src/shared/mongo/users-mongo.module';
import { UserFactoryService } from './factory/user.factory';
import { MailService } from 'src/shared/mailer/mail.service';
import { MailModule } from 'src/shared/mailer/mail.module';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guards/authenticatoin.guard';

@Module({
  imports: [
    ShareModule,
    UserMongoModule,
    MailModule,
    CacheModule.register({ isGlobal: true }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt').secret,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserFactoryService,
    MailService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AuthModule {}
