import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/users/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { VehicleDetailsInterface } from '../../interface/vehicleDetails.interface';

@Component({
  selector: 'app-vehicles-details',
  templateUrl: './vehicles-details.component.html',
  styleUrl: './vehicles-details.component.scss'
})
export class VehiclesDetailsComponent implements OnInit{
  vehiclesDetails: VehicleDetailsInterface | null = null;
  router = inject(Router);
  id: string;
  constructor(private storateService:StorageService, private userService:UserService,private route: ActivatedRoute) { 
    this.id = this.route.snapshot.paramMap.get('linces_plate')!;
  }
  ngOnInit(): void {
    //Si no tiene iniciada una sesión se le redirige al login
    if (!this.storateService.isLoggedIn()) {
      this.router.navigate(['/']);
    }else {
      this.userService.getDetailVehicle(this.id).subscribe({
        next: (response) => {
          this.vehiclesDetails = response;
          console.log(this.vehiclesDetails);
        },
        error: (error) => {
          alert('Error al cargar las multas');
          this.router.navigate(['/fines']);
        }
      });
  }
}
}
