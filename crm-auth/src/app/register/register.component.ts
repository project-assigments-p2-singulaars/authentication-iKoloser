import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  authService = inject(AuthService);
  jwtHelper = inject(JwtHelperService);
  router = inject(Router);

  formgroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  submitUser() {
    if (this.formgroup.valid) {
      this.authService.register(this.formgroup.value).subscribe(
        response => {
          if (response.accessToken) {
            localStorage.setItem('token', response.accessToken)
            this.router.navigate(['/dashboard']);
          
          }          
}
      );
    }
  }

}
