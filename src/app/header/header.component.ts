import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AdministrationService } from '../services/administration/administration.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  erros: string = '';
  role: string | null = '';
  isLoggedIn: boolean = false;
  router = inject(Router);
  name: string | null = '';

  SearchForm = new FormGroup({
    Value: new FormControl(''),
    Search: new FormControl(''),
  });

  constructor(private readonly storageService: StorageService, private readonly administrationService: AdministrationService, private location: Location) { }
  ngOnInit(): void {
    this.storageService.currentRole.subscribe(role => { this.role = role })
    this.storageService.currentSession.subscribe(session => { this.isLoggedIn = session !== null })
    this.storageService.currentname.subscribe(name => { this.name = name })

  }
  async logout(): Promise<void> {
    this.storageService.logout();
    this.storageService.changeRole(null);
    this.router.navigate(['/login']);
  }
  submit() {
    this.erros = '';
    this.administrationService._dataObjectSet = null;
    this.administrationService._dataOptionSet = null;
    const option = Number(this.SearchForm.get('Value')?.value!);
    const toSearch = (this.SearchForm.get('Search')?.value!).trim();
    switch (option) {
      case 1: {
        this.administrationService.getVehicleDetails(toSearch).subscribe({
          next: (data) => {
            this.administrationService._dataObjectSet = data;
            this.administrationService._dataOptionSet = 1;
            this.router.navigate(['/agent/info']).then(() => {
              window.location.reload();
            });
          },
          error: (error) => {
            console.log(error);
            this.erros = error.error.message;
          }
        });
        break;
      }
      case 2: {
        this.administrationService.getUserDetails(toSearch).subscribe({
          next: (data) => {
            this.administrationService._dataObjectSet = data;
            this.administrationService._dataOptionSet = 2;
            this.router.navigate(['/agent/info']).then(() => {
              window.location.reload();
            });
          },
          error: (error) => {
            console.log(error);
            this.erros = error.error.message;
          }
        });
        break;
      }
      case 3: {
        this.router.navigate(['/agent/fines/finesDetails', toSearch]).then(() => {
          window.location.reload();
        });
         break;
      }
      case 4: {
        this.administrationService.validateAdmin().subscribe({
          next: () => {
            this.administrationService.getPoliceDetails(toSearch).subscribe({
              next: (data) => {
                this.administrationService._dataObjectSet = data;
                this.administrationService._dataOptionSet = 4;
                this.router.navigate(['/agent/info']).then(() => {
                  window.location.reload();
                });
                console.log(data);
              },
              error: (error) => {
                console.log(error);
                this.erros = error.error.message;
              }
            });
          },
          error: (error) => {
            console.log(error);
            this.erros = error.error.message;
          }
        });  
        break;
      }
      default: { console.log('No se selecciono ninguna opcion'); break; }
    }
  }
}
