import { Component, NgZone, OnInit } from '@angular/core';
import { SseServiceService } from './services/SseService/sse-service.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'icosaf';
  //NgZone to alert Angular when an event occurs because it happens outside of the framework.
  constructor(private sseService: SseServiceService, private ngZone: NgZone, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) {
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
      'logout-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/logoutIcon.svg'));

  }

  ngOnInit() {
    console.log("Contacting events...")
    this.sseService
      .getServerSentEvent("http://icosaf.cloud.reply.eu:4200/api")
      .subscribe(data => console.log(data));


   
      console.log(this.activatedRoute.url)
   }


  onSelect(iconSelected) {
    console.log(iconSelected)
  }
}