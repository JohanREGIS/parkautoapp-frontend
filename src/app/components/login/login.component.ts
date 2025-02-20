import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { NotificationService } from '../../services/notification/notification.service';
import { User } from '../../models/user/user';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HeaderType } from '../../enum/header-type.enum';
import { NotificationType } from '../../enum/notification-type.enum';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  public showLoading !: boolean; // != rend l'attribut nullable
  private subscriptions: Subscription[] = [];

  constructor(private router:Router, private authenticationService:AuthenticationService, 
    private notificationService:NotificationService) {}

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('user/management');
    } else {
      this.router.navigateByUrl('login');
    }
  }

  public onLogin(user:User):void {
    this.showLoading = true;

    this.subscriptions.push(
      this.authenticationService.login(user).subscribe({
        next:
        (response:HttpResponse<User>) => {  // Ok Response
          
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          console.log(response);

          this.authenticationService.saveToken(token!);
          this.authenticationService.addUserToLocalCache(response.body!);
          this.router.navigateByUrl('user/management');
          this.sendErrorNotification(NotificationType.SUCCESS, "bravo");
          this.showLoading = false;
        },
        error:
        (errorResponse:HttpErrorResponse) => {  // Error Response
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      })
    );
  }

  sendErrorNotification(notificationType: NotificationType, message: string):void {
    if(message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "AN ERROR OCCURED, PLEASE TRY AGAIN");
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      sub => sub.unsubscribe()
    );
  }

}
