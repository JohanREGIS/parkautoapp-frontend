import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehiculesComponent } from './components/vehicules/vehicules.component';
import { VoituresComponent } from './components/voitures/voitures.component';
import { CamionsComponent } from './components/camions/camions.component';
import { provideHttpClient } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { NotificationModule } from './notification.module';
import { NotificationService } from './services/notification/notification.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { UserService } from './services/user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    VehiculesComponent,
    VoituresComponent,
    CamionsComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NotificationModule
  ],
  providers: [provideHttpClient(), NotificationService, AuthenticationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
