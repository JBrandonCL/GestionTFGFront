import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';  
import { environment, httpOptions } from '../../../environments/environment';
import { PostFineDto } from '../../interface/postFine.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = environment.apiUrl + "/users/me";

  constructor(private http: HttpClient) {}

  public getMyVehicles():Observable<any> {
    return this.http.get(this.url + "/vehicles");
  }
  public getDetailVehicle(id: string):Observable<any> {
    return this.http.get(environment.apiUrl + "/vehicles/details/" + id,httpOptions);
  }
  public validateRol():Observable<any> {
    return this.http.get(environment.apiUrl + "/police/validate/rol",httpOptions);
  }
  public postFine(postFine:PostFineDto):Observable<any> {
    return this.http.post(environment.apiUrl + "/police/ticket", postFine,httpOptions);
  }
}
