import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../../models/user/user';
import { UserService } from '../../services/user/user.service';
import { NotificationService } from '../../services/notification/notification.service';
import { NotificationType } from '../../enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: false,
  
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$ = this.titleSubject.asObservable();
  private subscriptions:Subscription[] = [];
  public users:User[] = [];
  public refreshing:boolean = false;


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {  }

  ngOnInit(): void {
    this.getUsers(true);
  }

  public changeTitle(title:string):void {
    this.titleSubject.next(title);
  }

  public logOut() {
    this.authenticationService.logout();
    this.router.navigateByUrl('login');
  }
  
  public getUsers(showNotification:boolean):void {
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getUsers().subscribe({
        next:
        (response:User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
          this.refreshing = false;

          if(showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully`);
          }
        },
        error:
        (errorResponse:HttpErrorResponse) => {  // Error Response
                  this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
                  this.refreshing = false;
                }
      })
    );
  }

  sendNotification(notificationType: NotificationType, message: string):void {
    if(message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "AN ERROR OCCURED, PLEASE TRY AGAIN");
    }
  }
}
