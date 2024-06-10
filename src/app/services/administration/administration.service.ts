import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment, httpOptions } from '../../../environments/environment';
import { PostFineDto } from '../../interface/postFine.interface';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  private dataObjectKey = 'dataObject';
  private dataOptionKey = 'dataOption';

  constructor(private http: HttpClient) {}

  public validateRol():Observable<any> {
    return this.http.get(environment.apiUrl + "/police/validate/rol",httpOptions);
  }
  public postFine(postFine:PostFineDto):Observable<any> {
    return this.http.post(environment.apiUrl + "/police/ticket", postFine,httpOptions);
  }
  public getUserDetails(dni:string):Observable<any> {
    return this.http.get(environment.apiUrl + "/police/user/info/"+dni,httpOptions);
  }
  public getVehicleDetails(license_plate:string):Observable<any> {
    return this.http.get(environment.apiUrl + "/police/vehicle/info/"+license_plate,httpOptions);
  }
  public getFineDetails(referenceNumber:string):Observable<any> {
    return this.http.get(environment.apiUrl + "/police/fine/info/"+referenceNumber,httpOptions);
  }
  public getMyFines():Observable<any> {
    return this.http.get(environment.apiUrl + "/police/me/ticket",httpOptions);
  }
  get _dataObjectGet(): any {
    console.log('get dataObject');
    const data = window.sessionStorage.getItem(this.dataObjectKey);
    return data ? JSON.parse(data) : null;
  }

  set _dataObjectSet(data: any) {
    window.sessionStorage.setItem(this.dataObjectKey, JSON.stringify(data));
  }

  get _dataOptionGet(): any {
    console.log('get dataOption');
    return window.sessionStorage.getItem(this.dataOptionKey);
  }

  set _dataOptionSet(option: any) {
    window.sessionStorage.setItem(this.dataOptionKey, JSON.stringify(option));
  }
  public removeData(): void {
    window.sessionStorage.removeItem(this.dataObjectKey);
    window.sessionStorage.removeItem(this.dataOptionKey);
  }
}
