import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { StripeModule } from './stripe/stripe.module';
import { CustomerModule } from './customer/customer.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StripeModule,
    CustomerModule,
    SubscriptionModule,
    ProductModule,
  ],
})
export class AppModule {}
