import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/components/admin-layout/interfaces';
import { AuthService } from '../shared/components/admin-layout/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent  implements OnInit{
    form!: FormGroup;
    submitted = false;

  constructor(
    public auth:AuthService,
    private router:Router
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    }) 
  }

  get _email() {
    return this.form.get('email')
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true;
    const user:User ={
      email: this.form.value.email,
      password:this.form.value.password
    }
    this.auth.login(user).subscribe(()=>{
    this.form.reset()
    this.router.navigate(['/admin','dashboard'])
    this.submitted = false
  },()=>{
    this.submitted = false
  })
  }
}
