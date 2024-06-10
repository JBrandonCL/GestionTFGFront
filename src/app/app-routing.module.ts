import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { FinesComponent } from './users/fines/fines/fines.component';
import { DetailsFinesComponent } from './users/detailsFines/details-fines/details-fines.component';
import { VehiclesComponent } from './users/vehicles/vehicles.component';
import { VehiclesDetailsComponent } from './users/vehicles-details/vehicles-details.component';
import { FinesPoliceComponent } from './agent/police/fines-police/fines-police.component';
import { PostfineComponent } from './agent/police/postfine/postfine.component';
import { SearchInfoUserComponent } from './agent/police/search-info-user/search-info-user.component';
import { UpdateFineComponent } from './agent/update-fine/update-fine.component';

const routes: Routes =[
  //{ path: "", component: AppComponent, pathMatch: "full" },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  { path: "fines" , component:FinesComponent, pathMatch: "full"},
  { path: "fines/finesDetails/:fineId" , component:DetailsFinesComponent, pathMatch: "full"},
  { path: "vehicles" , component:VehiclesComponent, pathMatch: "full"},
  { path: "vehicles/vehicleDetails/:linces_plate" , component:VehiclesDetailsComponent, pathMatch: "full"},
  { path: "agent/fines" , component:FinesPoliceComponent, pathMatch: "full"},
  { path: "agent/postfine" , component:PostfineComponent, pathMatch: "full"},
  { path: "agent/fines/finesDetails/:fineId" , component:DetailsFinesComponent, pathMatch: "full"},
  { path: "agent/info" , component:SearchInfoUserComponent, pathMatch: "full"},
  { path: "agent/fines/update/:fineId" , component:UpdateFineComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
