import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment, httpOptions } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserLoginInterface } from '../../interface/userLogin.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = environment.apiUrl + '/auth/login';
  constructor(private http: HttpClient) { }

  /**
   * Se envia la interfaz de usuario para loguearse
   * @param data UserLoginInterface
   * @returns Jwt token en caso correcto o error
   */
  public login(data:UserLoginInterface): Observable<any> {
    return this.http.post(this.url, data, httpOptions);
  }
}
