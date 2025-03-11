import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../../models/user/user';
import { UserService } from '../../services/user/user.service';
import { NotificationService } from '../../services/notification/notification.service';
import { NotificationType } from '../../enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomHttpResponse } from '../../models/custom-http-response';
import { NgForm } from '@angular/forms';

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
  declare public selectedUser: User | null;
  public fileName !: string;
  public profileImage !: File;

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

  onSelectUser(selectedUser:User):void {
    this.selectedUser = selectedUser;
    //document.getElementById('openUserInfo');
    this.clickButton('openUserInfo');
  }

  onEditUser(_t50: User) {
    throw new Error('Method not implemented.');
  }

  onDeleteUser(userId: number):void {
    console.log("ID : " + userId);
    this.subscriptions.push(
      this.userService.deleteUser(userId).subscribe({
        next:
        (response:CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getUsers(true);
        },
        error:
        (errorResponse:HttpErrorResponse) => {  // Error Response
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      })
    );
  }

  onAddNewUser(userForm: NgForm):void {
    
    const formData = this.userService.createUserFormData(null as any, userForm.value, this.profileImage as any);

    this.subscriptions.push(
      this.userService.addUser(formData).subscribe({
        next:
        (response:User) => {
          this.clickButton('new-user-close');
          this.getUsers(false);

          // Vide les champs et le formulaire
          this.fileName = null as any;
          this.profileImage = null as any;
          userForm.reset();
          this.sendNotification(NotificationType.SUCCESS, `${response.firstname} ${response.lastname} added successfully`)
        },
        error:
        (errorResponse:HttpErrorResponse) => {  // Error Response
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null as any;
        }
      })
    );
  }

  onProfileImageChange($event: Event) {
    throw new Error('Method not implemented.');
  }

  saveNewUser():void {
    
    this.clickButton('new-user-save');

  }

  private clickButton(buttonId: string):void {
    document.getElementById(buttonId)?.click();
  }

}
