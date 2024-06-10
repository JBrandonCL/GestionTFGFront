import { Component, Input, OnInit } from '@angular/core';
import { AgentFinesInterface } from '../../interface/agentFines.interface';

@Component({
  selector: 'app-datas-fines',
  templateUrl: './datas-fines.component.html',
  styleUrl: './datas-fines.component.scss'
})
export class DatasFinesComponent implements OnInit{
  @Input() fines: any;
  @Input() option:number=0;
  finesShow: AgentFinesInterface[] = [];

ngOnInit(): void {
  if(this.option == 1){
    this.finesShow = this.fines.docs;
  } 
  if(this.option == 2){
    this.finesShow = this.fines.data;
  }
}

}
