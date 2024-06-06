import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { LoginComponent } from './login/login.component';
//import { RegisterComponent } from './register/register.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { LoginComponent } from './authentication/login/login.component';
import { FinesComponent } from './users/fines/fines/fines.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { DetailsFinesComponent } from './users/detailsFines/details-fines/details-fines.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { VehiclesComponent } from './users/vehicles/vehicles.component';
import { VehiclesDetailsComponent } from './users/vehicles-details/vehicles-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FinesComponent,
    DetailsFinesComponent,
    FooterComponent,
    HeaderComponent,
    VehiclesComponent,
    VehiclesDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CookieService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
