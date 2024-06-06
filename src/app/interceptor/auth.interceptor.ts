import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { StorageService } from '../services/storage/storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<unknown> > {
    // Obtén el token del StorageService
    const token = this.storageService.getToken();

    if (token) {
      // Si el token existe, clona la petición y agrega el token de autorización
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      // Envia la nueva petición
      return next.handle(authReq);
    } else {
      // Si no hay token, envía la petición original
      return next.handle(req);
    }
  }
}