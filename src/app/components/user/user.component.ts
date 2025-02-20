import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: false,
  
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {  }

  public logOut() {
    this.authenticationService.logout();
    this.router.navigateByUrl('login');
  }
  
}
