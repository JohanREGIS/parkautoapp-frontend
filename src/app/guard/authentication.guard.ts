import { CanActivateChildFn, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { inject } from "@angular/core";
import { NotificationService } from "../services/notification/notification.service";
import { NotificationType } from "../enum/notification-type.enum";

export const AuthenticationGuard: CanActivateChildFn= () => {

    var auth:boolean = inject(AuthenticationService).isUserLoggedIn();

    if(!auth) {
        inject(Router).navigate(['']);

        // Notification
        inject(NotificationService).notify(NotificationType.ERROR, `You need to login to access to this page.`);
    }
    return auth;
}