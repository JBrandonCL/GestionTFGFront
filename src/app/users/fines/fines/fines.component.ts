import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from '../../../services/storage/storage.service';
import { FinesService } from '../../../services/fines/fines.service';
import { Router } from '@angular/router';
import { FinesInterface } from '../../../interface/fines.interface';
import { UserService } from '../../../services/users/user.service';

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrl: './fines.component.scss'
})
export class FinesComponent implements OnInit {
  router = inject(Router);
  fines: FinesInterface[] = [];
  constructor(private storageService: StorageService, private finesService: FinesService, private readonly userService: UserService

  ) { }

  ngOnInit(): void {
    //Si no tiene iniciada una sesión se le redirige al login
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/']);
    } else {
      this.finesService.getFines().subscribe({
        next: (response) => {
          this.fines = response;
        },
        error: (error) => {
          alert('Error al cargar las multas');
        }
      });
    };
  }
  downloadPDF(fineId: string): void {
    this.finesService.downloadPDF(fineId).subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      var date = Date.now();
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'multa-' + date + '.pdf';
      link.click();
    }, (error) => {
      console.error('Download failed:', error);
    });
  }
  sendEmailToClaim(id:string): void {
    this.userService.getUserEmail().subscribe({
      next: (response) => {
        const recipient = 'madmotorlaravel@gmail.com';
        const subject = 'Reclamo por multa numero: '+id;
        const body = 'Estimado/a, \n\nMe gustaría presentar un reclamo por la multa recibida. Adjunto los detalles de la multa para su revisión. \n\nGracias.';

        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
      },
      error: (error) => {
        console.log (error);
        alert('Error al cargar el email');
      }
    });
  }
}
