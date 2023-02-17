import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as sharedActions from "../../shared/shared.actions";

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formLoginUser!: FormGroup;
  loading: boolean = false;
  appSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.formLoginUser = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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

  loginUser() {
    if (this.formLoginUser.invalid) return
    const { email, password } = this.formLoginUser.value;

    this.store.dispatch( sharedActions.isLoading() );
    this.authService.loginUser(email, password).then(
      action => {
        console.log('Action?', action);
        this.store.dispatch( sharedActions.stopLoading() );
        this.router.navigate(['/']);
      }
    ).catch(
      err => {
        console.error(err);
        this.store.dispatch( sharedActions.stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      }
    );
  }

}
