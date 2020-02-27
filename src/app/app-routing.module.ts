import { CustomerResolver } from './customers/customer-view/customer.resolver';
import { AuthModule } from "./auth/auth.module";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CustomersModule } from "./customers/customers.module";

import { CustomersComponent } from "./customers/customers/customers.component";
import { CustomerViewComponent } from "./customers/customer-view/customer-view.component";
import { CustomerFormComponent } from "./customers/customer-form/customer-form.component";
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuard } from './auth/auth.guard';
import { Error404Component } from './error404/error404.component';
import { CustomersResolver } from './customers/customers/customers.resolver';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "customers/new", component: CustomerFormComponent, canActivate: [AuthGuard] },
  { path: "customers/:id/edit", component: CustomerFormComponent, canActivate: [AuthGuard], resolve: { apiCustomer: CustomerResolver } },
  { path: "customers/:id", component: CustomerViewComponent, canActivate: [AuthGuard], resolve: { apiCustomer: CustomerResolver } },
  { path: "customers", component: CustomersComponent, canActivate: [AuthGuard], resolve: { apiCustomers: CustomersResolver } },
  { path: "register", component: RegisterComponent },
  { path: "", redirectTo: "/customers", pathMatch: "full" },
  { path: "**", component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CustomersModule, AuthModule],
  exports: [RouterModule],
  declarations: [Error404Component]
})
export class AppRoutingModule { }
