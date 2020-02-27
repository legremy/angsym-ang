import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from './credentials';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { environment } from '../../environments/environment';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  // "account:{...}" : juste pour utiliser la syntaxe, on pourrait créer une interface
  register(account: { email: string, password: string, avatar: string }) {
    return this.http.post(`${environment.apiUrl}/users`, account);
  }

  public authenticate(credentials: Credentials) {
    return this.http
      .post(`${environment.apiUrl}/login_check`, credentials)
      .pipe(
        map((result: AuthResponse) => {
          window.localStorage.setItem('token', result.token);
          this.authState.next(true);
          return result;
        })
      );
  }

  public getToken(): string {
    return window.localStorage.getItem('token') || null;
  }

  public removeToken() {
    window.localStorage.removeItem('token');
    this.authState.next(false);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getUserData() {
    if (!this.getToken()) { return null; }
    return jwtDecode(this.getToken());
  }
}
