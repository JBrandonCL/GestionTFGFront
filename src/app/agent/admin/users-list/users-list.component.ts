import { Component, OnInit, inject } from '@angular/core';
import { AdministrationService } from '../../../services/administration/administration.service';
import { StorageService } from '../../../services/storage/storage.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserDetailsInterface } from '../../../interface/userDetails.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit{
  page: number = 1;
  router = inject(Router);
  listUsers:UserDetailsInterface[] = [];
  listUsersFilter: any = { fullName: '' ,dni:''};
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
      this.administrationService.getAllUsers().subscribe({
        next: (data) => {
          this.listUsers = data;
          console.log(data); 
        },
        error: () => {
          this.location.back();
        }
      });
    }
  }
  deleteUser(id:string){
    this.administrationService.deleteUser(id).subscribe({
      next: () => {
        this.router.navigate(['admin/list/users']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.log('Error');
        console.log(error);
      }
    });
  }
  upUser(id:string){
    this.administrationService.upUser(id).subscribe({
      next: () => {
        this.router.navigate(['admin/list/users']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.log('Error');
        console.log(error);
      }
    });
  }
  getUserFines(toSearch:string){
    this.administrationService.getUserDetails(toSearch).subscribe({
      next: (data) => {
        console.log(data);
        this.administrationService._dataObjectSet = data;
        this.administrationService._dataOptionSet = 2;
        this.router.navigate(['/agent/info']).then(() => {
          window.location.reload();
        });
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
