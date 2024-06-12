import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdministrationService } from '../../../services/administration/administration.service';
import { StorageService } from '../../../services/storage/storage.service';
import { Location } from '@angular/common';
import { AgentFinesInterface } from '../../../interface/agentFines.interface';

@Component({
  selector: 'app-fines-list',
  templateUrl: './fines-list.component.html',
  styleUrl: './fines-list.component.scss'
})
export class FinesListComponent implements OnInit{

  page: number = 1;
  fines:AgentFinesInterface[] = [];
  router = inject(Router);
  finesFilter: any = { licenses_plate: '', userId: '' };
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
      this.administrationService.getAllFines().subscribe({
        next: (data) => {
          this.fines = data;
          console.log(data); 
        },
        error: (error) => {
          console.log('Error'+error);
          this.location.back();
        }
      });
    }
  }
}
