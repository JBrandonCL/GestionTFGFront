import { HttpHeaders } from "@angular/common/http";

export const environment = {
    production: false,
    apiUrl: 'https://localhost:3000/v1'
};
export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };