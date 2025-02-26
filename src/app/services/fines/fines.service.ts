import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinesService {
  url: string = environment.apiUrl + "/users/me/fines";
  constructor(private http: HttpClient) { }

  public getFines():Observable<any> {
    return this.http.get(this.url);
  }
  public getDetailFine(id: string):Observable<any> {
    return this.http.get(environment.apiUrl + "/ticket/fine/" + id);
  }
  public downloadPDF(id: string): Observable<Blob> {
    return this.http.get(environment.apiUrl + "/ticket/pdf/download/" + id, { responseType: 'blob' });
  }
  public getDetailGestion(id: string):Observable<any> {
    return this.http.get(environment.apiUrl + "/ticket/fine/gestion/" + id);
  }
  public getFinesUser(id: string):Observable<any> {
    return this.http.get(environment.apiUrl + "/users/fines/" + id);
  }
  public getDetailsFineForUpdate(id: string):Observable<any> {
    return this.http.get(environment.apiUrl + "/police/fine/update/" + id);
  }
}
