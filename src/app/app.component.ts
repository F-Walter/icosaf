import { Component, OnInit, ViewChild } from '@angular/core';
import { SseServiceService } from './services/SseService/sse-service.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './components/login/login-dialog/login-dialog.component';
import { WorkArea } from './model/work-area/work-area';
import { Agv } from './model/agv/agv';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logIconSelected: boolean


  workAreas: WorkArea[]


  @ViewChild('iconList') iconList: MatSelectionList;
  @ViewChild('logList') logList: MatSelectionList;

  constructor(private sseService: SseServiceService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute, private router: Router,
    public dialog: MatDialog,) {
    this.logIconSelected = false

    iconRegistry.addSvgIcon(
      'dashboard-icon-selected',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/dashboardIconSelected.svg'));
    iconRegistry.addSvgIcon(
      'dashboard-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/dashboardIcon.svg'));
    iconRegistry.addSvgIcon(
      'setting-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/settingIcon.svg'));
    iconRegistry.addSvgIcon(
      'setting-icon-selected',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/settingIconSelected.svg'));
    iconRegistry.addSvgIcon(
      'login-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/loginIcon.svg'));
    iconRegistry.addSvgIcon(
      'logout-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/logoutIcon.svg'));
    iconRegistry.addSvgIcon(
      'error-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/errorIcon.svg'));
    iconRegistry.addSvgIcon(
      'danger-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/dangerIcon.svg'));
    iconRegistry.addSvgIcon(
      'success-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/successIcon.svg'));
    iconRegistry.addSvgIcon(
      'login-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/loginIcon.svg'));
    iconRegistry.addSvgIcon(
      'login-icon-selected',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/loginIconSelected.svg'));


    //Cards workAreas and agvs

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

  ngOnInit() {
    console.log("Contacting events...")
    this.sseService
      .getServerSentEvent("http://localhost:4200/API/events")
      .subscribe(data => console.log(data));
    console.log(this.activatedRoute.url)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '25%'
    });
  }

  onLogIconSelect() {
  }

  isLoggedIconSelected(): boolean {
    return this.logIconSelected
  }

  onSelect(list) {
    if (list == this.iconList) {
      //deseleziono l'altra lista
      this.logList.deselectAll()
      this.logIconSelected = false
    }
    else {
      // seleziono logList
      if (!this.logIconSelected) {
        this.openDialog()
        this.logIconSelected = true
      }
      this.iconList.deselectAll()
    }
    return list.selectedOptions.selected[0].value
  }




  navigateTo(url: string) {
    this.router.navigate([url])

  }
}