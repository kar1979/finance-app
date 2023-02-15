import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formLoginUser!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formLoginUser = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signinUser() {
    if (this.formLoginUser.invalid) return
    const { email, password } = this.formLoginUser.value;
    console.log('Data to signin', email, password);
    this.authService.signinUser(email, password).then(
      action => {
        console.log('Action?', action);
        this.router.navigate(['/']);
      }
    ).catch(
      err => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      }
    );
  }

}
