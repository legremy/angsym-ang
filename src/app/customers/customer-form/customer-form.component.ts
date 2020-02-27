import { CustomerService } from "./../customer.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Customer } from "../customer";
import { map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.css"]
})
export class CustomerFormComponent implements OnInit {
  form: FormGroup;
  error: boolean = false;
  customer: Customer;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.customer = this.route.snapshot.data.apiCustomer;
    this.initializeForm();

  }

  initializeForm() {
    this.form = new FormGroup({
      firstName: new FormControl(this.customer ? this.customer.firstName : ""),
      lastName: new FormControl(this.customer ? this.customer.lastName : ""),
      email: new FormControl((this.customer && this.customer.email) || "") // autre syntaxe
    });
  }

  handleSubmit() {
    if (this.customer) {
      const customer = { ...this.form.value, id: this.customer.id };
      this.customerService
        .update(customer)
        .subscribe(
          () => this.router.navigateByUrl("/customers/" + customer.id),
          httpError => this.handleHttpError(httpError)
        );
      return;
    } else {
      this.customerService.create(this.form.value).subscribe(
        customer => {
          // redirection en cas de succès
          this.router.navigateByUrl("customers/" + customer.id);
        },
        httpError => {
          this.handleHttpError(httpError);
        }
      );
    }
  }

  handleHttpError(httpError) {
    // si pas violations du form
    if (!httpError.error.violations) {
      this.error = true;
    }

    // si violations du form
    this.error = false;

    for (let violation of httpError.error.violations) {
      const { propertyPath, message } = violation;
      this.form.get(propertyPath).setErrors({
        violation: message
      });
    }
    // this.form.get("firstName").setErrors({
    //   violation: "Test"
    // });
  }

  hasViolation(fieldName: string) {
    return this.form.get(fieldName).hasError("violation");
  }

  getViolationMessage(fieldName: string) {
    return this.form.get(fieldName).getError("violation");
  }
}
