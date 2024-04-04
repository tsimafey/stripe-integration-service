import { Injectable } from '@nestjs/common';
import { StripeService } from 'src/stripe/stripe.service';
import Stripe from 'stripe';
import { SubscriptionInfo } from './subscription.interface';

@Injectable()
export class SubscriptionService {
  public readonly stripe: Stripe;
  constructor(private readonly stripeService: StripeService) {}

  async createSubscription(subscriptionInfo: SubscriptionInfo) {
    const subscription = await this.stripeService.stripe.subscriptions.create({
      customer: subscriptionInfo.customerId,
      items: [
        {
          price: subscriptionInfo.priceId,
        },
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent;

    return {
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
      amount: latestInvoice.total,
      currency: latestInvoice.currency,
    };
  }

  async getSubscriptionById(subscriptionId: string) {
    const subscription =
      await this.stripeService.stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  }

  async cancelSubscription(subscriptionId: string) {
    const cancelledSubscription =
      await this.stripeService.stripe.subscriptions.cancel(subscriptionId);
    return cancelledSubscription;
  }

  async resumeSubscription(subscriptionId: string) {
    const resumedSubscription =
      await this.stripeService.stripe.subscriptions.resume(subscriptionId, {
        billing_cycle_anchor: 'now',
      });
    return resumedSubscription;
  }
}
