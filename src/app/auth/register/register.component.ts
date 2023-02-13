import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required]
    });
  }

  createUser() {
    console.log('Form Group', this.formGroup);
    console.log('Valid?', this.formGroup.valid);
    console.log('Value', this.formGroup.value);
  }
}
