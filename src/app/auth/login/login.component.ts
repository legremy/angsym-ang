import { UiService } from './../../ui/ui.service';
import { AuthService } from "./../auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });
  errorMessage: string;
  constructor(private auth: AuthService, private router: Router, private ui: UiService) { }

  ngOnInit() { }

  handleSubmit() {
    if (this.form.invalid) { return; }
    // Activer l'écran de chargement
    this.ui.activateLoading();
    this.auth.authenticate(this.form.value).subscribe(
      resultat => {
        this.ui.deactivateLoading();
        this.errorMessage = '';
        this.router.navigateByUrl('/customers');
      },
      error => {
        // Désactive l'écran de chargement
        this.ui.deactivateLoading();
        if (error.status === 401) {
          this.errorMessage =
            'Impossible de se connecter avec ces données utilisateur';
          return;
        }
        this.errorMessage = 'Un problème est survenu';
      }
    );
  }
}
