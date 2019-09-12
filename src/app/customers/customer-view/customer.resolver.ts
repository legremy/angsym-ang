import { CustomerService } from './../customer.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Customer } from '../customer';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerResolver implements Resolve<Customer> {
    constructor(private service: CustomerService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Customer | Observable<Customer> | Promise<Customer> {
        const id = +route.paramMap.get("id");
        return this.service.find(id);
    }

}