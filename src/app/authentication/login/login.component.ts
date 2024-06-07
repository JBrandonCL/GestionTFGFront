import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLoginInterface } from '../../interface/userLogin.interface';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  erros: string = '';
  router = inject(Router);
  
  constructor(private authService:AuthService,private storateService:StorageService){}
  ngOnInit(): void {
    if (this.storateService.isLoggedIn()) {
      if(this.storateService.getRole() === 'USER')
      this.router.navigate(['/fines']);
    else{
      this.router.navigate(['agent/fines']);
    }
    }
  }

  /**
   * Formulario de login
   */
  LoginForm= new FormGroup({
    userNameOrEmail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  submit(){
    //Se limpia el error
    this.erros='';
    if(this.LoginForm.valid){
      //Se valida con un patter si es un correo electronico
      const cadena=this.LoginForm.get('userNameOrEmail')?.value!;
      const password = this.LoginForm.get('password')?.value!;
      if(this.isEmail(cadena)){
        //Se envia el email y la contraseña
        const data: UserLoginInterface = {
          email: cadena,
          password: password
        };
        this.authService.login(data).subscribe({
          next: (response) => {
            this.storateService.setToken(response.access_token);
            this.storateService.setRole(response.role);
            this.storateService.changeRole(response.role);
            this.storateService.setName(response.name);
            this.storateService.changeName(response.name);
            //*****Falta indicar a donde se redirigiria */
            this.router.navigate(['/fines']);
          },
          error: (error) => {
            this.erros = error.error.mensaje;
          }
        });
      }else{
        //Se envia el username y la contraseña
        const data: UserLoginInterface = {
          username: cadena,
          password: password
        };
        this.authService.login(data).subscribe({
          next: (response) => {
            this.storateService.setToken(response.access_token);
            this.storateService.setRole(response.role);
            this.storateService.changeRole(response.role);
            this.storateService.setName(response.name);
            this.storateService.changeName(response.name);
            if(response.role === 'USER')
            this.router.navigate(['/fines']);
          else{
            this.router.navigate(['agent/fines']);
          }
          },
          error: (error) => {
            console.log(error);
            this.erros = error.error.message;
          }
        });
      }
  }
}
  private isEmail(value: string): boolean {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(value);
  }
}
