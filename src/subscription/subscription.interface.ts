import { IsNotEmpty, IsString } from 'class-validator';

export class SubscriptionInfo {
  @IsString()
  @IsNotEmpty()
  priceId: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;
}

export class SubscriptionIdInfo {
  @IsString()
  @IsNotEmpty()
  subscriptionId: string;
}
