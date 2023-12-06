import {Component, OnInit} from '@angular/core';
import {CustomerDTO} from "../../models/customer-DTO";
import {CustomerService} from "../../services/customer/customer.service";
import {CustomerRegistrationRequest} from "../../models/customer-registration-request";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  display: boolean = false;
  customers: Array<CustomerDTO> = [];
  customer: CustomerRegistrationRequest = {};
  operation: 'create' | 'update' = 'create';
  constructor(private customerService: CustomerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.findAllCustomers();
  }

  createCustomer() {
    this.display = true;
    this.customer = {};
    this.operation = 'create';
  }

  findAllCustomers() {
    this.customerService.findAll().subscribe( {
      next: (data) => {
        this.customers = data;
        },
      error: () => {}
    });
  }
  save(customer: CustomerRegistrationRequest) {
    if (customer) {
      if (this.operation === 'create') {
        this.customerService.registerCustomer(customer).subscribe({
          next: (data) => {
            this.findAllCustomers();
            this.display = false;
            this.customer = {};
            this.messageService.add(
              {
                severity: 'success',
                summary: 'Customer saved',
                detail: `Customer ${customer.name} was successfully saved`
              }
            );
          },
          error: (err) => {}
        });
      } else if (this.operation === 'update') {
        this.customerService.updateCustomer(customer.id, customer).subscribe({
          next: () => {
            this.findAllCustomers();
            this.display = false;
            this.customer = {};
            this.messageService.add(
              {
                severity: 'success',
                summary: 'Customer updated',
                detail: `Customer ${customer.name} was successfully updated`
              });
          },
          error: () => {

          }
        })
      }
    }
  }
  deleteCustomer(customerDTO: CustomerDTO) {
    this.confirmationService.confirm( {
      header: 'Delete customer',
      message: `Are you sure you want to delete ${customerDTO.name}? You can\'t undo this action afterwords`,
      accept: () => {
        this.customerService.deleteCustomer(customerDTO.id).subscribe({
          next: () => {
            this.findAllCustomers();
            this.messageService.add(
              {
                severity: 'success',
                summary: 'Customer deleted',
                detail: `Customer ${customerDTO.name} was successfully deleted`
              }
            );

          }
        })
      }
    })
  }
  updateCustomer(customerDTO: CustomerDTO) {
    this.display = true;
    this.customer = customerDTO;
    this.operation = 'update';
  }

  cancel() {
    this.display = false;
    this.customer = {};
    this.operation = 'create';
  }
}
