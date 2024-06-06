import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from '../../../services/storage/storage.service';
import { FinesService } from '../../../services/fines/fines.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FinesDetailsInterface } from '../../../interface/finesDetails.interface';

@Component({
  selector: 'app-details-fines',
  templateUrl: './details-fines.component.html',
  styleUrl: './details-fines.component.scss'
})
export class DetailsFinesComponent implements OnInit{
  fineDetails: FinesDetailsInterface | null = null;
  router = inject(Router);
  fineId: string;
  constructor(private storateService:StorageService, private finesService:FinesService,private route: ActivatedRoute) { 
    this.fineId = this.route.snapshot.paramMap.get('fineId')!;
  }

  ngOnInit(): void {
    //Si no tiene iniciada una sesión se le redirige al login
    if (!this.storateService.isLoggedIn()) {
      this.router.navigate(['/']);
    }else {
      this.finesService.getDetailFine(this.fineId).subscribe({
        next: (response) => {
          this.fineDetails = response;
          console.log(this.fineDetails);
        },
        error: (error) => {
          alert('Error al cargar las multas');
          this.router.navigate(['/fines']);
        }
      });
  }
}
  downloadPDF(): void {
    this.finesService.downloadPDF(this.fineId).subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      var date= new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'multa-'+date+'.pdf';
      link.click();
    }, (error) => {
      console.error('Download failed:', error);
    });
  }
}
