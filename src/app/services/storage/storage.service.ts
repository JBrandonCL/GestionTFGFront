import { Injectable } from '@angular/core';

const Access_Token = 'auth-user';
const Expiration_Time = 'auth-expiration';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }
  /**
   * Limpia el sessionStorage
   * @returns void
   */
  public clean(): void {
    window.sessionStorage.clear();
  }
  /**
   *  Se guarda el token en el sessionStorage
   * @param token   token de acceso
   * @returns void
   */
  public setToken(token: string): void {
    window.sessionStorage.removeItem(Access_Token);
    window.sessionStorage.removeItem(Expiration_Time);
    window.sessionStorage.setItem(Access_Token, token);
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);
    window.sessionStorage.setItem(Expiration_Time, expirationDate.getTime().toString());
  }
  /**
   *  Se obtiene el token del sessionStorage
   * @returns  token de acceso o null
   */
  public getToken(): string | null {
    return window.sessionStorage.getItem(Access_Token);
  }
  /**
   *  Se verifica si existe el token
   * @returns  true si existe el token o false
   */
  public isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  /**
   *  Se verifica si el token ha expirado
   * @returns  true si el token ha expirado o false
   */
  public isTokenExpired(): boolean {
    const expirationTime = window.sessionStorage.getItem(Expiration_Time);
    if (!expirationTime) {
      // No hay tiempo de expiración, el token se considera como expirado
      return true;
    }
  
    const expirationTimeMs = parseInt(expirationTime, 10);
    const now = new Date().getTime();
    
    return now >= expirationTimeMs;
  }
}