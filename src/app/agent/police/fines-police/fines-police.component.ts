import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FinesInterface } from '../../../interface/fines.interface';
import { FinesService } from '../../../services/fines/fines.service';
import { StorageService } from '../../../services/storage/storage.service';
import { AdministrationService } from '../../../services/administration/administration.service';
import { Location } from '@angular/common';
import { AgentFinesInterface } from '../../../interface/agentFines.interface';

@Component({
  selector: 'app-fines-police',
  templateUrl: './fines-police.component.html',
  styleUrl: './fines-police.component.scss'
})
export class FinesPoliceComponent implements OnInit{
  router = inject(Router);
  fines: AgentFinesInterface[] = [];
  page: number = 1;
  finesFilter: any = { createdAt: '' };
  constructor(private storageService:StorageService, private administrationService:AdministrationService,private location: Location) { }
  ngOnInit(): void {
    //Si no tiene iniciada una sesión se le redirige al login
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/']);
    }else {
      this.administrationService.validateRol().subscribe({
        error: () => {
          this.location.back();
        }
      });
      this.administrationService.getMyFines().subscribe({
        next: (response) => {
          this.fines=response;
        },
        error: (error) => {
          alert('Error al cargar las multas');
        }
      });
    }
  }
  cleanFilter(){
    this.finesFilter = { createdAt: '' };
  }
}
