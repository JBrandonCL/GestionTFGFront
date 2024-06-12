import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { UserService } from '../../services/users/user.service';
import { VehiclesInterface } from '../../interface/vehicles.interface';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit{
  router = inject(Router);
  vehicles:VehiclesInterface[] = [];
  constructor(private storageService:StorageService, private userService:UserService) { }
  ngOnInit(): void {
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/']);
    }else {
      this.userService.getMyVehicles().subscribe({
        next: (response) => {
          this.vehicles=response;
          this.storageService.setRole('USER');
        },
        error: (error) => {
          alert('Error al cargar tus vehiculos');
        }
      });
      };
    }
  }