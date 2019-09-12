import { CustomerService } from "./../customer.service";
import { Component, OnInit } from "@angular/core";
import { Customer } from "../customer";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.css"]
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.customers = this.route.snapshot.data.apiCustomers;
    // this.customerService
    //   .findAll()
    //   .subscribe(customers => (this.customers = customers));
  }
}
