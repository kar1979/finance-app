import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  formNewUser!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formNewUser = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required]
    });
  }

  createUser() {
    if (this.formNewUser.invalid) {
      return;
    }
    const { name, email, password } = this.formNewUser.value;
    console.log('name', name);
    console.log('email', email);
    console.log('password', password);
    this.authService.createUser(name, email, password).then(
      credentials => {
        console.log('credentials', credentials);
        this.router.navigate(['/']);
      }
    ).catch(error => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
    });
  }
}
