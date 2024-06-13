import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { PostFineDto } from '../../interface/postFine.interface';
import { AdministrationService } from '../../services/administration/administration.service';
import { Location } from '@angular/common';
import { FinesService } from '../../services/fines/fines.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-fine',
  templateUrl: './update-fine.component.html',
  styleUrl: './update-fine.component.scss'
})
export class UpdateFineComponent implements OnInit{
  role:string="";
  router = inject(Router);
  fineId: string;
  fine:PostFineDto|null=null;
  erros: string = '';

  constructor(private storateService:StorageService, private administrationService:AdministrationService,private route: ActivatedRoute,private location: Location,private readonly finesService:FinesService) { 
    this.fineId = this.route.snapshot.paramMap.get('fineId')!;
  }
  ticketForm = new FormGroup({
    reason: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^\\S(.*\\S)?$')]),
    description: new FormControl(''),
    vehicle: new FormControl('', [Validators.required]),
    finesImport: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    console.log("ENTRA BIEN");
    if (!this.storateService.isLoggedIn()) {
      this.router.navigate(['/']);
    }else{
      this.administrationService.validateRol().subscribe({
        error: () => {
          this.location.back();
        }
      });
      this.finesService.getDetailsFineForUpdate(this.fineId).subscribe({
        next: (response) => {
          this.fine = response;
        console.log(this.fine);
        // Actualiza el formulario con los datos de la multa
        this.ticketForm.patchValue({
          reason: this.fine?.reason,
          description: this.fine?.description,
          vehicle: this.fine?.vehicle,
          finesImport: this.fine?.finesImport?.toString()
        });
        },
        error: (error) => {
          alert('Error al cargar las multas'+ error.error.message);
          this.location.back();
        }
      });
    }
  }
  submit(){
    this.erros='';
    if(this.ticketForm.valid){
      const data = {
        reason: this.ticketForm.get('reason')?.value!,
        description: this.ticketForm.get('description')?.value!,
        vehicle: this.ticketForm.get('vehicle')?.value!,
        finesImport: Number(this.ticketForm.get('finesImport')?.value)
      };
      const fine= new PostFineDto();
      fine.reason=data.reason;
      if (data.description && data.description.trim() !== '') {
        fine.description=data.description;
      }
      fine.vehicle=data.vehicle;
      fine.finesImport=data.finesImport;
      this.administrationService.updateFine(this.fineId,data).subscribe({
        next: () => {
          this.router.navigate(['/agent/fines']);
        },
        error: (error) => {
          console.log(error);
          this.erros = error.error.message;
        }
      });
    }
    
  }
}
