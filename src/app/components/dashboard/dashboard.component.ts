import { Component, OnInit } from '@angular/core';
import { WorkArea } from 'src/app/model/work-area/work-area';
import { Agv } from 'src/app/model/agv/agv';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EXPANSION_PANEL_ANIMATION_TIMING } from '@angular/material/expansion';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('collapsed', style({ transform: 'rotate(0)' })),
      state('expanded', style({ transform: 'rotate(-180deg)' })),
      transition('expanded <=> collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING)),
    ]),
  ]
})
export class DashboardComponent implements OnInit {


  stateJPH: string
  stateSat: string
  stateCycleTime: string

  expandPanel(expPanel, state) {
    expPanel.toggle()
    this.rotate(state)
  }

  rotate(state: string) {


    switch (state) {
      case 'stateSat':
        this.stateSat = (this.stateSat === 'collapsed' ? 'expanded' : 'collapsed');
        break;
      case 'stateJPH':
        this.stateJPH = (this.stateJPH === 'collapsed' ? 'expanded' : 'collapsed');

        break;
      case 'stateCycleTime':
        this.stateCycleTime = (this.stateCycleTime === 'collapsed' ? 'expanded' : 'collapsed');

        break;

      default:
        break;
    }
  }

  workAreas: WorkArea[]
  progress: number

  selectedWorkArea: WorkArea
  selectedAgv: Agv


  constructor(private router: Router) {

    this.stateJPH = 'collapsed';
    this.stateSat = 'collapsed'
    this.stateCycleTime = 'collapsed'

    this.progress = 75
    this.workAreas = []

    let w1 = new WorkArea(0, "AMR", [new Agv(0), new Agv(1)])
    let w2 = new WorkArea(1, "1", [new Agv(2), new Agv(3)])
    let w3 = new WorkArea(2, "2", [new Agv(4), new Agv(5)])
    let w4 = new WorkArea(3, "3", [new Agv(6), new Agv(7)])
    let w5 = new WorkArea(4, "4", [new Agv(8), new Agv(9)])
    let w6 = new WorkArea(5, "5", [new Agv(10), new Agv(11)])

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

  openGraph(typeGraph: string) {
    event.stopPropagation();
    this.router.navigate(["Home", { outlets: { dashboardContent: ["work-area", this.selectedWorkArea.id, "statistics", typeGraph] } }]);
  }


}


