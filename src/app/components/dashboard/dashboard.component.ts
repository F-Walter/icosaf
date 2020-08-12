import { Component, OnInit } from '@angular/core';
import { WorkArea } from 'src/app/model/work-area/work-area';
import { Agv } from 'src/app/model/agv/agv';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  workAreas: WorkArea[]

  constructor() {

    this.workAreas= []
    
    let w1 = new WorkArea(0, [new Agv(0), new Agv(1)])
    let w2 = new WorkArea(1, [new Agv(2), new Agv(3)])

    this.workAreas.push(w1, w2)

  }

  ngOnInit(): void {
  }

}
