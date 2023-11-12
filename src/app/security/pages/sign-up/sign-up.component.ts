import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signInForm: FormGroup

  constructor(private builderBuilder:FormBuilder,
              private authService:AuthenticationService,
              private router: Router) {
    this.signInForm = this.builderBuilder.group({
      email:[],
      password:[]
    })
  }

  signUp(){
    this.authService.signUp(this.signInForm.value).subscribe((response:any)=>{
      localStorage.setItem('accessToken',JSON.stringify(response.accessToken))
      localStorage.setItem('currentUser',JSON.stringify(response.user))
      this.signInForm.reset()
      this.router.navigate(['/home']).then()
    })
  }

  cancelSignUp(){
    console.log('Canceled')
  }

  get email(){
    return this.signInForm.controls['email']
  }
  get password(){
    return this.signInForm.controls['password']
  }

}
