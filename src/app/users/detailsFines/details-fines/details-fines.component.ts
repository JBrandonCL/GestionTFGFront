import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from '../../../services/storage/storage.service';
import { FinesService } from '../../../services/fines/fines.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FinesDetailsInterface } from '../../../interface/finesDetails.interface';
import { AdministrationService } from '../../../services/administration/administration.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-fines',
  templateUrl: './details-fines.component.html',
  styleUrl: './details-fines.component.scss'
})
export class DetailsFinesComponent implements OnInit{
  role:string="";
  fineDetails: FinesDetailsInterface | null = null;
  router = inject(Router);
  fineId: string;
  constructor(private storateService:StorageService, private finesService:FinesService,private route: ActivatedRoute,private readonly adminService:AdministrationService,private location: Location) { 
    this.fineId = this.route.snapshot.paramMap.get('fineId')!;
  }

  ngOnInit(): void {
    //Si no tiene iniciada una sesión se le redirige al login
    if (!this.storateService.isLoggedIn()) {
      this.router.navigate(['/']);
    } else {
      this.finesService.getDetailGestion(this.fineId).subscribe({
        next: (response) => {
          this.fineDetails = response;
          this.role="police"
        },
        error: (error) => {
          this.finesService.getDetailFine(this.fineId).subscribe({
            next: (response) => {
              this.role="user"
              this.storateService.setRole("USER");
              this.fineDetails = response;
            },
            error: (error) => {
              this.location.back();
            }
          });
        }
      });
    }
  }
  downloadPDF(): void {
    this.finesService.downloadPDF(this.fineId).subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      var date= Date.now();
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'multa-'+date+'.pdf';
      link.click();
    }, (error) => {
      console.error('Download failed:', error);
    });
  }
  deleteFine(): void {
    this.adminService.validateAdmin().subscribe({
      next: () => {
        if(confirm('¿Estás seguro de que quieres eliminar la multa?'))
        this.adminService.deleteFine(this.fineId).subscribe({
          next: () => {
            this.router.navigate(['/agent/fines']);
          },
          error: () => {
            alert('Error al eliminar la multa');
          }
        });
      
      },
      error: () => {
        alert('No tienes permisos para eliminar la multa');
      }
    });
  }
}
