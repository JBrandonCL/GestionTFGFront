import { Component, Input, OnInit, inject } from '@angular/core';
import { AdministrationService } from '../../../services/administration/administration.service';
import { StorageService } from '../../../services/storage/storage.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { VehicleDetailsInterface } from '../../../interface/vehicleDetails.interface';
import { UserDetailsInterface } from '../../../interface/userDetails.interface';
import { PoliceInfoInterface } from '../../../interface/policeInfo.interface';

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
  policeDetails:PoliceInfoInterface| null = null;
  totalFines:number=0;
  currentPage: number = 1;
  totalPages: number = 1;

  objectoOption:number=0;
  constructor(private readonly storageService:StorageService,private readonly administrationService:AdministrationService,private location: Location) { }

  ngOnInit(): void {
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
            this.vehicleDetails=this.objectoRecive.vehicleResponse;
            this.fines=this.objectoRecive.fines;
            this.totalFines=this.objectoRecive.fines.totalDocs;
            this.currentPage = this.objectoRecive.fines.page;
            this.totalPages = this.objectoRecive.fines.totalPages;
          }
          if(this.objectoOption == 2){
          this.userDetails=this.objectoRecive.userResponse;
          this.fines=this.objectoRecive.fines;
          this.totalFines=this.objectoRecive.fines.meta.totalItems;
          this.currentPage = this.objectoRecive.fines.meta.currentPage;
          this.totalPages = this.objectoRecive.fines.meta.totalPages;
          }
          if(this.objectoOption == 4){
            this.fines=this.objectoRecive.fines;
            this.policeDetails=this.objectoRecive.responsePolice;
            this.currentPage = this.objectoRecive.fines.page;
            this.totalPages = this.objectoRecive.fines.totalPages;
          }
        }
      });
    }
  }
  loadPoliceDetails(page: number = 1): void {
    const identification = this.policeDetails?.identification!;
    this.administrationService.getPoliceDetails(identification, page).subscribe({
      next: (data) => {
        this.administrationService._dataObjectSet = data;
        this.administrationService._dataOptionSet = 4;
        this.objectoRecive = data;
        this.fines = data.fines.docs;
        this.policeDetails = data.responsePolice;
        this.totalFines = data.fines.totalDocs;
        this.currentPage = data.fines.page;
        this.totalPages = data.fines.totalPages;
        this.router.navigate(['/agent/info']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  loadVehicleDetails(page: number = 1): void {
    const identification = this.vehicleDetails?.license_plate!;
    this.administrationService.getVehicleDetails(identification, page).subscribe({
      next: (data) => {
        this.administrationService._dataObjectSet = data;
        this.administrationService._dataOptionSet = 1;
        this.objectoRecive = data;
        this.fines = data.fines.docs;
        this.vehicleDetails=data.vehicleResponse;
        this.totalFines = data.fines.totalDocs;
        this.currentPage = data.fines.page;
        this.totalPages = data.fines.totalPages;
        this.router.navigate(['/agent/info']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  // En el componente SearchInfoUserComponent 
  loadUserDetails(page: number = 1): void {
    const dni = this.userDetails?.dni!;
    this.administrationService.getUserDetails(dni, page).subscribe({
      next: (data) => {
        this.administrationService._dataObjectSet = data;
        this.administrationService._dataOptionSet = 2;
        this.objectoRecive = data;
        this.fines = data.fines.data;
        this.userDetails = data.userResponse;
        this.totalFines = data.fines.meta.totalItems;
        this.currentPage = data.fines.meta.currentPage;
        this.totalPages = data.fines.meta.totalPages;
        this.router.navigate(['/agent/info']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.loadPoliceDetails(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadPoliceDetails(this.currentPage + 1);
    }
  }
  goToPreviousPageVehicle(): void {
    if (this.currentPage > 1) {
      this.loadVehicleDetails(this.currentPage - 1);
    }
  }

  goToNextPageVehicle(): void {
    if (this.currentPage < this.totalPages) {
      this.loadVehicleDetails(this.currentPage + 1);
    }
  }
  goToPreviousPageUser(): void {
    if (this.currentPage > 1) {
      this.loadUserDetails(this.currentPage - 1);
    }
  }
  
  goToNextPageUser(): void {
    if (this.currentPage < this.totalPages) {
      this.loadUserDetails(this.currentPage + 1);
    }
  }
}
