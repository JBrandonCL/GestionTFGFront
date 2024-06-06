import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from '../../../services/storage/storage.service';
import { FinesService } from '../../../services/fines/fines.service';
import { Router } from '@angular/router';
import { FinesInterface } from '../../../interface/fines.interface';

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrl: './fines.component.scss'
})
export class FinesComponent implements OnInit{
  router = inject(Router);
  fines: FinesInterface[] = [];
  constructor(private storageService:StorageService, private finesService:FinesService) { }

  ngOnInit(): void {
    //Si no tiene iniciada una sesión se le redirige al login
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/']);
    }else {
      this.finesService.getFines().subscribe({
        next: (response) => {
          this.fines=response;
        },
        error: (error) => {
          alert('Error al cargar las multas');
        }
      });
      };
    }
}
