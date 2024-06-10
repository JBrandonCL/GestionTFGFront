import { Component, Input, OnInit, inject } from '@angular/core';
import { AdministrationService } from '../../../services/administration/administration.service';
import { StorageService } from '../../../services/storage/storage.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AgentFinesInterface } from '../../../interface/agentFines.interface';
import { VehicleDetailsInterface } from '../../../interface/vehicleDetails.interface';
import { UserDetailsInterface } from '../../../interface/userDetails.interface';
import { Pagination } from '../../../interface/pagination.interface';

@Component({
  selector: 'app-search-info-user',
  templateUrl: './search-info-user.component.html',
  styleUrl: './search-info-user.component.scss'
})
export class SearchInfoUserComponent implements OnInit {
  router = inject(Router);
  objectoRecive:any;
  fines:any[]=[];
  vehicleDetails:VehicleDetailsInterface| null = null;
  userDetails:UserDetailsInterface| null = null;
  totalFines:number=0;

  objectoOption:number=0;
  constructor(private readonly storageService:StorageService,private readonly administrationService:AdministrationService,private location: Location) { }

  ngOnInit(): void {
    console.log(" SE HA EJECUTADO ");
    if(!this.storageService.isLoggedIn()){
      this.router.navigate(['/login']);
    }else{
      this.administrationService.validateRol().subscribe({
        error: () => {
          this.location.back();
        },
        next: (data) => {
          this.objectoRecive = this.administrationService._dataObjectGet;
          this.objectoOption = this.administrationService._dataOptionGet;

          if(this.objectoOption == 1){
            console.log("Option 1");
            this.vehicleDetails=this.objectoRecive.vehicleResponse;
            this.fines=this.objectoRecive.fines;
            this.totalFines=this.objectoRecive.fines.totalDocs;
          }
          if(this.objectoOption == 2){
            console.log("Option 2");
          this.userDetails=this.objectoRecive.userResponse;
          this.fines=this.objectoRecive.fines;
          this.totalFines=this.objectoRecive.fines.totalDocs;
          }
          if(this.objectoOption == 3){
            console.log("Option 3");
          console.log(this.objectoRecive);
          }
        }
      });
    }
  }

}
