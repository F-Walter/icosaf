import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SseService } from './services/SseService/sse-service.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './components/login/login-dialog/login-dialog.component';
import { MatSelectionList } from '@angular/material/list';
import { NotificationComponent } from './components/notification/notification.component';
import { UCCService } from './services/UC-C/uc-c-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logIconSelected: boolean


  @ViewChild('iconList') iconList: MatSelectionList;
  @ViewChild('logList') logList: MatSelectionList;




  constructor(
    private uccService: UCCService,
    private sseService: SseService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
  }
  ngAfterViewInit(): void {
  }

  ngOnInit() {


    console.log("Contacting events...")
    this.sseService
      .getServerSentEvent("http://localhost:4200/API/events")
      .subscribe(response => {

        console.log();

        let data = JSON.parse(response.data)
        if (data.status === "NOK") {
          const dialogRef = this.dialog.open(NotificationComponent, {
            disableClose: true,
            width: 'auto',
            height: 'auto',
            data: {
              workAreaId:
                this.uccService.selectedWorkArea.id,
              workAreaName:
                this.uccService.selectedWorkArea.name,
              taskId: data.task_id,
              agvId:
                this.uccService.selectedAgv.id
            },
            panelClass: "zeroPaddingModal"
          })
        }
      });
    console.log(this.activatedRoute.url)

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '25%'
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.logList.deselectAll()
      this.logIconSelected = false
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