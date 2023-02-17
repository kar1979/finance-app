import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as sharedActions from '../../shared/shared.actions';

import { AuthService } from '../../services/auth.service';
import { stopLoading } from '../../shared/shared.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  formNewUser!: FormGroup;
  loading: boolean = false;
  appSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.formNewUser = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required]
    });

    this.appSubscription = this.store.select('app').subscribe(
      app => {
        this.loading = app.isLoading;
        console.log('Loading?', this.loading);
      }
    );
  }

  ngOnDestroy() {
    this.appSubscription.unsubscribe();
  }

  createUser() {
    if (this.formNewUser.invalid) {
      return;
    }
    const { name, email, password } = this.formNewUser.value;

    this.store.dispatch( sharedActions.isLoading() );
    this.authService.createUser(name, email, password).then(
      credentials => {
        console.log('credentials', credentials);
        this.store.dispatch( sharedActions.stopLoading() );
        this.router.navigate(['/']);
      }
    ).catch(error => {
      console.error(error);
      this.store.dispatch( sharedActions.stopLoading() );
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
    });
  }
}
