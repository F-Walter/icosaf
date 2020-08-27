import { Component, OnInit } from '@angular/core';
import { WorkArea } from 'src/app/model/work-area/work-area';
import { Agv } from 'src/app/model/agv/agv';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('800ms ease-out')),
      transition('default => rotated', animate('800ms ease-in'))])
    ]
})
export class DashboardComponent implements OnInit {


  state: string = 'default';

  expandPanel(expPanel){
    expPanel.toggle()
    this.rotate()
  }

    rotate() {
        this.state = (this.state === 'default' ? 'rotated' : 'default');
    }

  workAreas: WorkArea[]
  progress: number

  selectedWorkArea: WorkArea
  selectedAgv: Agv


  constructor(private router: Router) {

    this.progress = 75
    this.workAreas = []

    let w1 = new WorkArea(0, [new Agv(0), new Agv(1)])
    let w2 = new WorkArea(1, [new Agv(2), new Agv(3)])
    let w3 = new WorkArea(2, [new Agv(4), new Agv(5)])
    let w4 = new WorkArea(3, [new Agv(6), new Agv(7)])
    let w5 = new WorkArea(4, [new Agv(8), new Agv(9)])
    let w6 = new WorkArea(5, [new Agv(10), new Agv(11)])

    w1.agvList[0].setProgress(30)
    w1.agvList[1].setProgress(5)
    w1.agvList[0].setError(true)

    w2.agvList[0].setProgress(100)
    w2.agvList[1].setProgress(52)
    w2.agvList[1].setError(true)

    w3.agvList[0].setProgress(100)
    w3.agvList[1].setProgress(52)
    w3.agvList[1].setError(true)

    w4.agvList[0].setProgress(77)
    w4.agvList[1].setProgress(99)
    w4.agvList[1].setError(true)

    w5.agvList[0].setProgress(1)
    w5.agvList[1].setProgress(52)
    w5.agvList[1].setError(true)

    w6.agvList[0].setProgress(23)
    w6.agvList[1].setProgress(90)
    w6.agvList[1].setError(true)


    this.workAreas.push(w1, w2, w3, w4, w5, w6)

  }

  ngOnInit(): void {
  }

  openAgvDetails(workArea: WorkArea, agv: Agv) {
    this.router.navigate(["Home", { outlets: { dashboardContent: ["work-area", workArea.id, "agv-details", agv.id] } }]);

    this.selectedAgv = agv
    this.selectedWorkArea = workArea
    event.stopPropagation();
  }

  selectWorkArea(workArea: WorkArea) {
    this.selectedAgv = null
    if (this.selectedWorkArea == workArea) {
      //unselect the card
      this.selectedWorkArea = null
    }
    else
      this.selectedWorkArea = workArea

    // remove details about card
    this.router.navigate(["Home"])
  }

  openMeanCycleTime() {
    event.stopPropagation();
  }
  openMeanSat() {
    event.stopPropagation();

  }
  openMeanJPH() {
    event.stopPropagation();

  }

}


