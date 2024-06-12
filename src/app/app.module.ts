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
import { FinesPoliceComponent } from './agent/police/fines-police/fines-police.component';
import { PostfineComponent } from './agent/police/postfine/postfine.component';
import { SearchInfoUserComponent } from './agent/police/search-info-user/search-info-user.component';
import { DatasFinesComponent } from './agent/datas-fines/datas-fines.component';
import { UpdateFineComponent } from './agent/update-fine/update-fine.component';
import { UpdateUserComponent } from './users/update/update-user/update-user.component';
import { BoardComponent } from './agent/admin/board/board.component';
import { PoliceListComponent } from './agent/admin/police-list/police-list.component';
import { UsersListComponent } from './agent/admin/users-list/users-list.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdatePoliceComponent } from './agent/admin/update-police/update-police.component';
import { FinesListComponent } from './agent/admin/fines-list/fines-list.component';

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
    FinesPoliceComponent,
    PostfineComponent,
    SearchInfoUserComponent,
    DatasFinesComponent,
    UpdateFineComponent,
    UpdateUserComponent,
    BoardComponent,
    PoliceListComponent,
    UsersListComponent,
    UpdatePoliceComponent,
    FinesListComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FilterPipeModule,
    NgxPaginationModule
  ],
  providers: [CookieService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
