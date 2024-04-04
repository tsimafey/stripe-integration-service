import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  public readonly stripe: Stripe;
  constructor(config: ConfigService) {
    this.stripe = new Stripe(config.get('STRIPE_API_KEY'));
  }
}
