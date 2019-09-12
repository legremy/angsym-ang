import { UiService } from "./../../ui/ui.service";
import { Component, OnInit } from "@angular/core";
import { CustomerService } from "../customer.service";
import { ActivatedRoute } from "@angular/router";
import { Customer } from "../customer";
import { switchMap, map } from "rxjs/operators";

@Component({
  selector: "app-customer-view",
  templateUrl: "./customer-view.component.html",
  styleUrls: ["./customer-view.component.css"]
})
export class CustomerViewComponent implements OnInit {
  customer: Customer;
  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.customer = this.route.snapshot.data.apiCustomer;
  }

  getStatusLabel(status: string) {
    return this.uiService.getInvoicesStatusLabel(status);
  }
  getStatusClass(status: string) {
    return this.uiService.getInvoiceStatusBadge(status);
  }
}
