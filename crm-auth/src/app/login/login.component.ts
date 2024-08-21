import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  authService = inject(AuthService);
  jwtHelper = inject(JwtHelperService);
  router = inject(Router);
  
  formgroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });


  submitUser() {
    if (this.formgroup.valid) {
      this.authService.login(this.formgroup.value).subscribe(
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
