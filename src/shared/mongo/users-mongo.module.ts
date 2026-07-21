import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminRepository } from 'src/models/admin/admin.repository';
import { Admin, AdminSchema } from 'src/models/admin/admin.schema';
import { CustomerRepository } from 'src/models/customer/customer.repository';
import { Customer, CustomerSchema } from 'src/models/customer/customer.schema';
import { UserRebository } from 'src/models/user/user.repository';
import { User, UserSchema } from 'src/models/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: User.name, schema: UserSchema,discriminators:[
        {name:Admin.name,schema:AdminSchema },
        {name:Customer.name,schema:CustomerSchema}
        ] }
    ]),
  ],
  controllers: [],
  providers: [UserRebository,CustomerRepository,AdminRepository],
  exports: [UserRebository,CustomerRepository,AdminRepository],
})
export class UserMongoModule {}
