import { Component, OnInit, inject } from '@angular/core';
import { UserRegisterInterface } from '../../../interface/userregister.interface';
import { UserService } from '../../../services/users/user.service';
import { StorageService } from '../../../services/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UpdateUserInterface } from '../../../interface/updateUser.interface';
import { AdministrationService } from '../../../services/administration/administration.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit{
  isDisabled = true;
  user:UserRegisterInterface|null=null;
  router = inject(Router);
  errors: string = '';
  UserId: string|null=null;
  constructor(private readonly userService:UserService,private readonly storageService:StorageService,private location: Location,private readonly administrationService:AdministrationService,private route: ActivatedRoute) { 
    this.UserId = this.route.snapshot.paramMap.get('dni');
  }

  updateUserForm = new FormGroup({
    name: new FormControl({value: '', disabled: true}, [Validators.required]),
    lastname1: new FormControl({value: '', disabled: true}, [Validators.required]),
    lastname2: new FormControl({value: '', disabled: true}, [Validators.required]),
    dni: new FormControl({value: '', disabled: true}, [Validators.required]),
    direction: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    town: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    isDeleted: new FormControl(false)
  });

  ngOnInit() {
    console.log('update-user');
    if(!this.storageService.isLoggedIn()){
      this.router.navigate(['/']);
  }else{
    this.administrationService.detailsUser(this.UserId!).subscribe({
      next:(response)=>{
        console.log(response);
        this.user = response;
          // Rellenar el formulario con los datos del usuario
          this.updateUserForm.patchValue({
            name: this.user?.name,
            lastname1: this.user?.lastname1,
            lastname2: this.user?.lastname2,
            dni: this.user?.dni,
            direction: this.user?.direction,
            zipcode: this.user?.zipcode.toString(),
            town: this.user?.town,
            username: this.user?.username,
            email: this.user?.email,
            isDeleted: this.user?.isDeleted
          });
      },
      error:(error)=>{
        console.log(error);
        this.userService.getUserDetail().subscribe({
          next:(response)=>{
            this.user = response;
              // Rellenar el formulario con los datos del usuario
              this.updateUserForm.patchValue({
                name: this.user?.name,
                lastname1: this.user?.lastname1,
                lastname2: this.user?.lastname2,
                dni: this.user?.dni,
                direction: this.user?.direction,
                zipcode: this.user?.zipcode.toString(),
                town: this.user?.town,
                username: this.user?.username,
                email: this.user?.email,
                isDeleted: this.user?.isDeleted
              });
          },
          error:(error)=>{
            alert('Error al cargar los datos del usuario');
            this.location.back();
          }
        });
      }
    });
  }
  }
  submit(){
    this.errors = '';
    if(this.updateUserForm.valid){
      const formValue = this.updateUserForm.value;
      const data: UpdateUserInterface = {
        direction: formValue.direction!,
        zipcode: Number(formValue.zipcode)!,
        town: formValue.town!,
        username: formValue.username!,
        email: formValue.email!,
        password: formValue.password??null,
        isDeleted: Boolean(formValue.isDeleted)!
      };

      this.administrationService.updateUser(this.UserId!,data).subscribe({
        next:(response)=>{
          if(Boolean(this.updateUserForm.value.isDeleted)==true)
          this.logout();
          this.location.back();
        },
        error:(error)=>{
          this.userService.updateUser(data).subscribe({
            next:(response)=>{
              if(Boolean(this.updateUserForm.value.isDeleted)==true)
              this.logout();
              this.location.back();
            },
            error:(error)=>{
              console.log(error);
              this.errors = error.error.message;
            }
          });
        }
      });
  }
  }
  async logout(): Promise<void> {
    console.log('logout');
    this.storageService.logout();
    this.storageService.changeRole(null);
    this.router.navigate(['/login']);
  }
}
