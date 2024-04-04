import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerInfo } from './customer.interface';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('create')
  createCustomer(@Body() customerInfo: CustomerInfo) {
    return this.customerService.createCustomer(customerInfo);
  }

  @Get('list')
  getCustomers() {
    return this.customerService.getCustomers();
  }
}
