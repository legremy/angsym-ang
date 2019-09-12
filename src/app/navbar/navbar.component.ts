import { AuthService } from "./../auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  template: `
    <nav class="mb-4 navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" routerLink="/">AngSym CRM</a>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" routerLinkActive="active">
            <a class="nav-link" routerLink="/customers">Clients</a>
          </li>
          <li class="nav-item" routerLinkActive="active">
            <a class="nav-link" routerLink="/invoices">Mes factures</a>
          </li>
        </ul>

        <ul class="navbar-nav">
          <li class="nav-item" *ngIf="!isAuthenticated">
            <a routerLink="/register" class="btn btn-primary">Inscription</a>
          </li>

          <li class="nav-item" *ngIf="!isAuthenticated">
            <a routerLink="/login" class="btn btn-success">Connexion</a>
          </li>

          <li class="nav-item" *ngIf="isAuthenticated">
            <a class="nav-link" routerLink="/profile"
              ><img
                [src]="userData.avatar"
                alt=""
                class="md-avatar rounded"
              />{{userData.username}}</a
            >
          </li>

          <li class="nav-item" *ngIf="isAuthenticated">
            <button (click)="onLogout()" class="btn btn-danger">
              Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [
    `
      .md-avatar {
        vertical-align: middle;
        width: 32px;
        height: 32px;
      }
    `
  ]
})
export class NavbarComponent implements OnInit {
  userData: any; //mauvaise pratique, crée rune interface:mieux
  isAuthenticated: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.userData = this.authService.getUserData();
    }
    this.authService.authState.subscribe(state => {
      this.isAuthenticated = state;
      if (this.isAuthenticated) {
        this.userData = this.authService.getUserData();
      }

    });
  }

  onLogout() {
    this.authService.removeToken();
    this.router.navigateByUrl("/login");
  }
}
