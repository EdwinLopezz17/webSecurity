import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup

  constructor(private builderBuilder:FormBuilder,
              private authService:AuthenticationService,
              private router: Router) {
    this.signInForm = this.builderBuilder.group({
      email:[],
      password:[]
    })
  }

  signIn(){
    this.authService.signIn(this.signInForm.value).subscribe((response:any)=>{
      localStorage.setItem('accessToken',JSON.stringify(response.accessToken))
      localStorage.setItem('currentUser',JSON.stringify(response.user))
      this.signInForm.reset()
      this.router.navigate(['/home']).then()
    })
  }

  cancelSignIn(){
    console.log('Canceled')
  }

  get email(){
    return this.signInForm.controls['email']
  }
  get password(){
    return this.signInForm.controls['password']
  }
}
