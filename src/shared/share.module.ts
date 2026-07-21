import { Module } from '@nestjs/common';
import { PasswordHasherService } from './security/password-hasher.service';

@Module({
  providers: [PasswordHasherService],
  exports: [PasswordHasherService],
})
export class ShareModule {}
