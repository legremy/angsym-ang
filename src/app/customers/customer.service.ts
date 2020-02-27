import { AuthService } from "./../auth/auth.service";
import { Customer } from "./customer";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';

const api = `${environment.apiUrl}/customers`;

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  public getHeaders() {
    return {
      headers: {
        Authorization: "Bearer " + this.auth.getToken()
      }
    };
  }

  public findAll(): Observable<Customer[]> {
    return this.http
      .get(api)
      .pipe(map(data => data["hydra:member"] as Customer[]));
  }

  public find(id: number): Observable<Customer> {
    return this.http.get<Customer>(api + "/" + id);
  }

  public create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(api, customer);
  }

  public update(customer: Customer) {
    return this.http.put<Customer>(api + "/" + customer.id, customer);
  }
}

