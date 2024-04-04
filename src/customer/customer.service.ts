import { Injectable } from '@nestjs/common';
import { StripeService } from 'src/stripe/stripe.service';
import Stripe from 'stripe';
import { CustomerInfo } from './customer.interface';

@Injectable()
export class CustomerService {
  public readonly stripe: Stripe;
  constructor(private readonly stripeService: StripeService) {}

  getCustomers() {
    return this.stripeService.stripe.customers.list();
  }

  createCustomer(customerInfo: CustomerInfo) {
    return this.stripeService.stripe.customers.create(customerInfo);
  }
}
