import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { NavbarComponent } from './navbar/navbar.component';
registerLocaleData(localeFr, "fr");

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
