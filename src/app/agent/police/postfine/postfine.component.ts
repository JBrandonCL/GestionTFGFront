import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { StorageService } from '../../../services/storage/storage.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostFineDto } from '../../../interface/postFine.interface';

@Component({
  selector: 'app-postfine',
  templateUrl: './postfine.component.html',
  styleUrl: './postfine.component.scss'
})
export class PostfineComponent implements OnInit {
  router = inject(Router);
  erros: string = '';
  constructor(private readonly userService:UserService, private readonly storateService:StorageService ,private location: Location) { }

  ngOnInit(): void {
    if(!this.storateService.isLoggedIn()){
      this.router.navigate(['/login']);
    }else{
      this.userService.validateRol().subscribe({
        error: () => {
          this.location.back();
        }
      });
    }
  }
  ticketForm = new FormGroup({
    reason: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    vehicle: new FormControl('', [Validators.required]),
    finesImport: new FormControl('', [Validators.required]),
  });
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
      this.userService.postFine(data).subscribe({
        next: () => {
          this.router.navigate(['/agent/fines']);
        },
        error: (error) => {
          console.log(error);
          this.erros = error.error.mensaje;
        }
      });
    }
  }
}
