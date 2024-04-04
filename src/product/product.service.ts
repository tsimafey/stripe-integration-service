import { Injectable } from '@nestjs/common';
import { StripeService } from 'src/stripe/stripe.service';
import Stripe from 'stripe';

@Injectable()
export class ProductService {
  public readonly stripe: Stripe;
  constructor(private readonly stripeService: StripeService) {}

  async getProducts() {
    const { data: products } = await this.stripeService.stripe.products.list({
      active: true,
    });

    const productsWithPrices = await Promise.all(
      products.map(async (product) => {
        const prices = await this.stripeService.stripe.prices.retrieve(
          product.default_price as string,
        );
        return {
          ...product,
          prices,
        };
      }),
    );

    return productsWithPrices;
  }
}
