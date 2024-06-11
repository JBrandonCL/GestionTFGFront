import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from '../../../services/storage/storage.service';
import { AdministrationService } from '../../../services/administration/administration.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  router = inject(Router);
  constructor(private readonly storageService:StorageService,private readonly administrationService:AdministrationService,private location: Location) { }
  ngOnInit(): void {
    if(!this.storageService.isLoggedIn()){
      this.router.navigate(['/']);
    }else{
      this.administrationService.validateRol().subscribe({
        error: () => {
          this.location.back();
        }
      });
    }
  }
}
