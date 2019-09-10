import { CustomerService } from "./../customer.service";
import { Component, OnInit } from "@angular/core";
import { Customer } from "../customer";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.css"]
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService
      .findAll()
      .subscribe(customers => (this.customers = customers));
  }
}
