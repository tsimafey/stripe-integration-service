import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionIdInfo, SubscriptionInfo } from './subscription.interface';

@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post('create')
  createSubscription(@Body() subscriptionInfo: SubscriptionInfo) {
    return this.subscriptionService.createSubscription(subscriptionInfo);
  }

  @Get('/:id')
  getSubscriptionById(@Param('id') id: string) {
    return this.subscriptionService.getSubscriptionById(id);
  }

  @Post('cancel/:id')
  cancelSubscription(@Body() subscriptionIdInfo: SubscriptionIdInfo) {
    return this.subscriptionService.cancelSubscription(
      subscriptionIdInfo.subscriptionId,
    );
  }

  @Post('resume/:id')
  resumeSubscription(@Body() subscriptionIdInfo: SubscriptionIdInfo) {
    return this.subscriptionService.cancelSubscription(
      subscriptionIdInfo.subscriptionId,
    );
  }
}
