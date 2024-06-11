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
  public updateFine(id:string,postFine:PostFineDto):Observable<any> {
    return this.http.patch(environment.apiUrl + "/police/fine/update/" + id,postFine);
  }
  public getUserDetails(dni:string, page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${environment.apiUrl}/police/user/info/${dni}?limit=${limit}&page=${page}`, httpOptions);
}
  public getVehicleDetails(license_plate:string,page: number = 1, limit: number = 10):Observable<any> {
    return this.http.get(environment.apiUrl + "/police/vehicle/info/"+license_plate+"?limit="+limit+"&page="+page,httpOptions);
  }
  public getFineDetails(referenceNumber:string):Observable<any> {
    return this.http.get(environment.apiUrl + "/police/fine/info/"+referenceNumber,httpOptions);
  }
  public getMyFines():Observable<any> {
    return this.http.get(environment.apiUrl + "/police/me/ticket",httpOptions);
  }
  public validateAdmin():Observable<any>{
    return this.http.get(environment.apiUrl + "/police/validate/admin",httpOptions);
  }
  public getPoliceDetails(identification: string, page: number = 1, limit: number = 10): Observable<any> {
  return this.http.get(`${environment.apiUrl}/police/police/info/${identification}?limit=${limit}&page=${page}`, httpOptions);
  }
  public getAllPolice():Observable<any>{
    return this.http.get(environment.apiUrl + "/police/allPolice",httpOptions);
  }
  public getAllUsers():Observable<any>{
    return this.http.get(environment.apiUrl + "/police/allUsers",httpOptions);
  }
  public deleteAgent(id:string):Observable<any>{
    return this.http.get(environment.apiUrl + "/police/removeAgent/"+id,httpOptions);
  }
  public upAgent(id:string):Observable<any>{
    return this.http.get(environment.apiUrl + "/police/upAgent/"+id,httpOptions);
  }
  public deleteUser(id:string):Observable<any>{
    return this.http.get(environment.apiUrl + "/police/removeUser/"+id,httpOptions);
  }
  public upUser(id:string):Observable<any>{
    return this.http.get(environment.apiUrl + "/police/upUser/"+id,httpOptions);
  }
  public detailsUser(id:string):Observable<any>{
    return this.http.get(environment.apiUrl + "/police/update/user/"+id,httpOptions);
  }
  public updateUser(id:string,data:any):Observable<any>{
    return this.http.patch(environment.apiUrl + "/police/update/user/"+id,data,httpOptions);
  }

  get _dataObjectGet(): any {
    const data = window.sessionStorage.getItem(this.dataObjectKey);
    return data ? JSON.parse(data) : null;
  }

  set _dataObjectSet(data: any) {
    window.sessionStorage.setItem(this.dataObjectKey, JSON.stringify(data));
  }

  get _dataOptionGet(): any {
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
