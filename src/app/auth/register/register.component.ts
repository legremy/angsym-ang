import { UiService } from './../../ui/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    avatar: new FormControl('')
  })
  constructor(private auth: AuthService, private router: Router, private ui: UiService) { }

  ngOnInit() {


  }
  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("email");
  }

  handleSubmit() {
    this.ui.activateLoading();
    this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigateByUrl("/login");
      },
      (httpError: HttpErrorResponse) => {
        this.ui.deactivateLoading();
        if (httpError.status === 400) {
          //violations
          const violations: Violation[] = httpError.error.violations; // décrire la forme qu'ont les violations
          // const violations = httpError.error.violations as Violation[]; cette ligne est strictement identique à celle du dessus

          for (const apiViolation of violations) {
            this.form.get(apiViolation.propertyPath).setErrors({
              violation: apiViolation.message
            })
          }
          return;
        }
        // autre souci
        return;
      }
    );


  }

}
interface Violation {
  propertyPath: string;
  message: string;
}