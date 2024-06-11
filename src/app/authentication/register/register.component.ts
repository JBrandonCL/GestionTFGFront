import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegisterInterface } from '../../interface/userregister.interface';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  erros: string = '';
   usernamePattern = /^(?!police\.).*$/;
  constructor(private authService: AuthService, private router: Router, private storageService: StorageService) {}

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname1: new FormControl('', [Validators.required]),
    lastname2: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    direction: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    town: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required,Validators.pattern(this.usernamePattern)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  submit() {
    this.erros = '';
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      if(!this.usernamePattern.test(formValue.username!)){
        this.erros = 'Username must not start with "police."';
        this.registerForm.get('username')?.setValue('');
        return;
      }
      const data: UserRegisterInterface = {
        name: formValue.name!,
        lastname1: formValue.lastname1!,
        lastname2: formValue.lastname2!,
        dni: formValue.dni!,
        direction: formValue.direction!,
        zipcode: Number(formValue.zipcode)!,  // Convertir zipcode a número
        town: formValue.town!,
        username: formValue.username!,
        email: formValue.email!,
        password: formValue.password!
      };

      this.authService.register(data).subscribe({
        next: (response) => {
            this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);
          this.erros = error.error.message;
        }
      });
    }else{
      if(!this.usernamePattern.test(this.registerForm.value.username!)){
        console.log("ENTRA EN EL IF ");
        this.erros = 'Username must not start with "police."';
        this.registerForm.get('username')?.setValue('');
        return;
      }
      console.log(this.registerForm.value.username);
      this.registerForm.markAllAsTouched();
      this.erros = 'Please fill out all the fields';
    }
  }
}
