import { CustomerService } from './../customer.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Customer } from '../customer';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomersResolver implements Resolve<Customer[]>{
    constructor(private service: CustomerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Customer[] | Observable<Customer[]> | Promise<Customer[]> {
        return this.service.findAll();
    }

}
