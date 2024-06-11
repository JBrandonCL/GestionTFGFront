import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdministrationService } from '../../../services/administration/administration.service';
import { StorageService } from '../../../services/storage/storage.service';
import { Location } from '@angular/common';
import { PoliceInfoInterface } from '../../../interface/policeInfo.interface';

@Component({
  selector: 'app-police-list',
  templateUrl: './police-list.component.html',
  styleUrl: './police-list.component.scss'
})
export class PoliceListComponent {
  page: number = 1;
  listPolice:PoliceInfoInterface[] = [];
  router = inject(Router);
  listPoliceFilter: any = { dni: '' };
  constructor(private readonly storageService:StorageService,private readonly administrationService:AdministrationService,private location: Location) { }
  ngOnInit(): void {
    if(!this.storageService.isLoggedIn()){
      this.router.navigate(['/']);
    }else{
      this.administrationService.validateRol().subscribe({
        error: () => {
          this.location.back();
        }
      });
      this.administrationService.getAllPolice().subscribe({
        next: (data) => {
          this.listPolice = data;
          console.log(data); 
        },
        error: () => {
          this.location.back();
        }
      });
    }
  }
  deleteAgent(id:string){
    this.administrationService.deleteAgent(id).subscribe({
      next: () => {
        this.router.navigate(['admin/list/police']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.log('Error');
        console.log(error);
      }
    });
  }
  upAgent(id:string){
    this.administrationService.upAgent(id).subscribe({
      next: () => {
        this.router.navigate(['admin/list/police']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.log('Error');
        console.log(error);
      }
    });
  }
  getAgentFines(toSearch:string){
    this.administrationService.getPoliceDetails(toSearch).subscribe({
      next: (data) => {
        console.log(data);
        this.administrationService._dataObjectSet = data;
        this.administrationService._dataOptionSet = 4;
        this.router.navigate(['/agent/info']).then(() => {
          window.location.reload();
        });
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
