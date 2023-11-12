import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WEBSECURITY';

  constructor(private router:Router) {
  }

  getCurrentUser() {
    let currentUserJSON = localStorage.getItem("currentUser");

    if (currentUserJSON) {
      try {
        let currentUser = JSON.parse(currentUserJSON);
        return currentUser.email;
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
      }
    } else {
      return null;
    }
  }

  getCurrentToken(){
    let currentTokenJSON = localStorage.getItem("accessToken");

    if (currentTokenJSON) {
        let currentToken = JSON.parse(currentTokenJSON)
        return currentToken

    } else {
      return null
    }
  }
  signOut(){
    localStorage.removeItem('currentUser')
    localStorage.removeItem('accessToken')
    this.router.navigate(['sign-in']).then()
  }

}
