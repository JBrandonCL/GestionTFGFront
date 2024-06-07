import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  role: string | null = '';
  isLoggedIn: boolean = false;
  router = inject(Router);
  name: string | null = '';
  
  constructor(private readonly storageService:StorageService) { }
  ngOnInit(): void {
    this.storageService.currentRole.subscribe( role=>{this.role=role} )
    this.storageService.currentSession.subscribe( session=>{this.isLoggedIn = session !== null} )
    this.storageService.currentname.subscribe( name=>{this.name=name} )
    
  }
  async logout(): Promise<void> {
    console.log('logout');
    this.storageService.logout();
    this.storageService.changeRole(null);
    this.router.navigate(['/login']);
  }
}
