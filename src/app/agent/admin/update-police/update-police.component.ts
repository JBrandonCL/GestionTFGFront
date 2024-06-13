import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrationService } from '../../../services/administration/administration.service';
import { StorageService } from '../../../services/storage/storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-police',
  templateUrl: './update-police.component.html',
  styleUrl: './update-police.component.scss'
})
export class UpdatePoliceComponent implements OnInit {
  errors: string ='';
  UserId: string|null=null;
  entidad: any;
  router = inject(Router);
  constructor(private readonly storageService:StorageService,private location: Location,private readonly administrationService:AdministrationService,private route: ActivatedRoute) { 
    this.UserId = this.route.snapshot.paramMap.get('dni');
  }
  updatePoliceForm = new FormGroup({
    name: new FormControl({value: '', disabled: true}, [Validators.required]),
    lastname1: new FormControl({value: '', disabled: true}, [Validators.required]),
    lastname2: new FormControl({value: '', disabled: true}, [Validators.required]),
    dni: new FormControl({value: '', disabled: true}, [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    isDeleted: new FormControl(false)
  });

  ngOnInit(): void {
    if(!this.storageService.isLoggedIn()){
      this.router.navigate(['/']);
    }else{
      this.administrationService.validateAdmin().subscribe({
        next:()=>{
          this.administrationService.getUpdatePoliceDetaisl(this.UserId!).subscribe({
            next:(response)=>{
              console.log(response);
              this.entidad = response;
              // Rellenar el formulario con los datos del usuario
              this.updatePoliceForm.patchValue({
                name: this.entidad?.name,
                lastname1: this.entidad?.lastname1,
                lastname2: this.entidad?.lastname2,
                dni: this.entidad?.dni,
                username: this.entidad?.username,
                email: this.entidad?.email,
                isDeleted: this.entidad?.isDeleted
              });
            },
            error:(error)=>{
              console.log(error);
              this.location.back();
            }
          });
        },
        error:(error)=>{
          console.log(error);
          this.location.back();
        }
      });
    }
  }
  submit(){
    this.errors = '';
    if(this.updatePoliceForm.valid){
      console.log(this.updatePoliceForm.value.isDeleted)  ;
      var value=this.updatePoliceForm.value.isDeleted!.toString();
      if(value=="false"){
        this.updatePoliceForm.value.isDeleted=false;
      }else{
        this.updatePoliceForm.value.isDeleted=true;
      }
      console.log(this.updatePoliceForm.value.isDeleted)  ;
      this.administrationService.updatePolice(this.UserId!,this.updatePoliceForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          this.location.back();
        },
        error:(error)=>{
          console.log(error);
          this.errors = error.error.message;
        }
      });
    }
  }
}
