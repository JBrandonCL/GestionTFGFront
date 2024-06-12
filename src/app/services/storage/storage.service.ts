import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const Access_Token = 'auth-user';
const Expiration_Time = 'auth-expiration';
const Role='auth-role';
const UserName='auth-username';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private roleSource = new BehaviorSubject<string | null>(this.isLoggedIn()?this.getRole():null);
  currentRole = this.roleSource.asObservable();
  private sesion = new BehaviorSubject<string | null>(this.isLoggedIn() ? this.getToken() : null);
  currentSession = this.sesion.asObservable();
  private name = new BehaviorSubject<string | null>(this.isLoggedIn() ? this.getName() : null);
  currentname = this.name.asObservable();
  
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
    window.sessionStorage.removeItem(Role);
    window.sessionStorage.removeItem(UserName);
    window.sessionStorage.setItem(Access_Token, token);
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);
    window.sessionStorage.setItem(Expiration_Time, expirationDate.getTime().toString());
    this.sesion.next(token);
  }
  /**
   * Almacena el rol del usuario en el sessionStorage
   * @param role rol del usuario
   */
  public setRole(role: string): void {
    window.sessionStorage.removeItem(Role);
    window.sessionStorage.setItem(Role, role);
  }
  /**
   *  Se obtiene el rol del usuario del sessionStorage
   * @returns  rol del usuario o null
   */
  public getRole(): string | null {
    return window.sessionStorage.getItem(Role);
  }
  public setName(name: string): void {
    window.sessionStorage.removeItem(UserName);
    window.sessionStorage.setItem(UserName, name);
    this.name.next(name);
  }
  public getName(): string | null {
    return window.sessionStorage.getItem(UserName);
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

  changeRole(role: string | null) {
    this.roleSource.next(role);
  }
  changeName(name: string | null){
    this.name.next(name);
  } 
  logout(): void {
    this.sesion.next(null);
    window.sessionStorage.removeItem(Access_Token);
    window.sessionStorage.removeItem(Expiration_Time);
    window.sessionStorage.removeItem(Role);
    window.sessionStorage.removeItem(UserName);
    window.sessionStorage.clear();
  }
}