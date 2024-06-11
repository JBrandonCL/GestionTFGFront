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
import { UpdateUserComponent } from './users/update/update-user/update-user.component';
import { BoardComponent } from './agent/admin/board/board.component';
import { PoliceListComponent } from './agent/admin/police-list/police-list.component';
import { AdministrationListComponent } from './agent/admin/administration-list/administration-list.component';
import { UsersListComponent } from './agent/admin/users-list/users-list.component';

const routes: Routes =[
  //{ path: "", component: AppComponent, pathMatch: "full" },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  { path: "update", component: UpdateUserComponent, pathMatch: "full" }, 
  { path: 'update/admin/:dni', component: UpdateUserComponent, pathMatch: 'full' },
  { path: "fines" , component:FinesComponent, pathMatch: "full"},
  { path: "fines/finesDetails/:fineId" , component:DetailsFinesComponent, pathMatch: "full"},
  { path: "vehicles" , component:VehiclesComponent, pathMatch: "full"},
  { path: "vehicles/vehicleDetails/:linces_plate" , component:VehiclesDetailsComponent, pathMatch: "full"},
  { path: "agent/fines" , component:FinesPoliceComponent, pathMatch: "full"},
  { path: "agent/postfine" , component:PostfineComponent, pathMatch: "full"},
  { path: "agent/fines/finesDetails/:fineId" , component:DetailsFinesComponent, pathMatch: "full"},
  { path: "agent/info" , component:SearchInfoUserComponent, pathMatch: "full"},
  { path: "agent/fines/update/:fineId" , component:UpdateFineComponent, pathMatch: "full"},
  { path: "admin" , component:BoardComponent, pathMatch: "full"},
  { path: "admin/list/police" , component:PoliceListComponent, pathMatch: "full"},
  { path: "admin/list/administration" , component:AdministrationListComponent, pathMatch: "full"},
  { path: "admin/list/users" , component:UsersListComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
