import { Customer } from "./customer";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

const api = "http://localhost:8000/customers";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  public findAll(): Observable<Customer[]> {
    return this.http
      .get(api)
      .pipe(map(data => data["hydra:member"] as Customer[]));
  }
}
