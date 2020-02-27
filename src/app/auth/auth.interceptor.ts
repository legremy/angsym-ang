import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.authService.isAuthenticated()) {
      return next.handle(req);
    }

    const token = this.authService.getToken();
    const clonedReq = req.clone({
      headers: req.headers.append("Authorization", "Bearer " + token)
    });


    //   intercept(
    //     req: HttpRequest < any >,
    //     next: HttpHandler
    //   ): Observable < HttpEvent < any >> {
    //     if(!this.service.isAuthenticated()) {
    //     return next.handle(req);
    //   }

    //   const token = this.service.getToken();

    //   const cloneReq = req.clone({
    //     headers: req.headers.append("Authorization", "Bearer " + token)
    //   });
    //   // console.log("j'ai été appelé");
    //   return next.handle(cloneReq);
    // }





    return next.handle(clonedReq);
  }
}
