## Create Stripe account and products

Go to [`Stripe register page`](https://dashboard.stripe.com/register) and create an account, then verify your email.

To suggest some products or services (e.g different plans) your customers can subscribe to you need to create them in your Stripe dashboard. Go to [`Product catalog page`](https://dashboard.stripe.com/products) of Stripe dashboard and create your products.

![Creating a product](./assets/create-product.png)

## Stripe API key

Before using this service create .env file in the root of the project and copy the content of .env.example file there. Go to [`API keys page`](https://dashboard.stripe.com/test/apikeys), copy your Secret key and paste it to your .env file as a value of STRIPE_API_KEY variable.

![Secret key](./assets/secret-key.png)

## Retrieve products

To retrieve products which you created on the client side use:

GET /product/list

This call will return you an array of the product objects like this:

```js
{
  "id": "prod_NWjs8kKbJWmuuc",
  "object": "product",
  "active": true,
  "created": 1678833149,
  "prices": [...],
  ...
}
```

The product object has "prices" array with available prices for this product like this:

```js
{
  "id": "price_1MoBy5LkdIwHu7ixZhnattbh",
  "object": "price",
  "active": true,
  "billing_scheme": "per_unit",
  "created": 1679431181,
  "currency": "usd",
  ...
}
```

You will need the "id" of the price object to create the subscription.

## Create customer

Before your user can create a subscription to one of the products you have to create a customer entity in your Stripe project. For this use:

POST /customer/create

with the body

```js
type CustomerInfo = {|
  name: string,
  email: string,
|};
```

This call will return you the customer object like this:

```js
{
  "id": "cus_NffrFeUfNV2Hib",
  "object": "customer",
  "address": null,
  "balance": 0,
  "created": 1680893993,
  ...
}
```

You will be able to use an "id" of created customer to create a subscription.

## Create subscription

To create a subscription use:

POST /subscription/create

with the body

```js
type SubscriptionInfo = {|
  priceId: string, // The id of a price you got from /product/list request
  customerId: string, // The id from customer object you created before
|};
```

This call will return you the Subscription object with "clientSecret" field. You will need Client Secret to pass to Stripe Elements on the client side to procceed with payment and to confirm the subscription.

## Other functions

### Get subscription

To get information about a subscription use:

GET /subscription/:id

### Cancel subscription

To cancel a subscription use:

POST /subscription/cancel/:id

### Resume subscription

To resume a subscription after cancelling use:

POST /subscription/resume/:id