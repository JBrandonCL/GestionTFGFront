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
  public getUserDetail():Observable<any> {
    return this.http.get(this.url+"/update");
  }
  public updateUser(data: any):Observable<any> {
    return this.http.patch(this.url+"/update", data, httpOptions);
  }
  public getUserEmail():Observable<any> {
    return this.http.get(environment.apiUrl + "/users/me/my-email");
  }
}
