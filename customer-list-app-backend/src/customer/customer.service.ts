import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) { }
    // pobierz wszystkich uzytkownikow
    async getAllCustomer(): Promise<Customer[]> {
        const customers = await this.customerModel.find().exec();
        return customers;
    }
    // pobierz jednego uzytkownika
    async getCustomer(customerID): Promise<Customer> {
        const customer = await this.customerModel.findById(customerID).exec();
        return customer;
    }
    // dodaj uzytkownika
    async addCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        const newCustomer = await this.customerModel(createCustomerDTO);
        return newCustomer.save();
    }
    // edytuj uzytkownika
    async updateCustomer(customerID, createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        const updatedCustomer = await this.customerModel
            .findByIdAndUpdate(customerID, createCustomerDTO, { new: true });
        return updatedCustomer;
    }
    // usun uzytkownika
    async deleteCustomer(customerID): Promise<any> {
        const deletedCustomer = await this.customerModel.findByIdAndRemove(customerID);
        return deletedCustomer;
    }
}