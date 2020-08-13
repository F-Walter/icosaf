import { Component, OnInit } from '@angular/core';
import { SseServiceService } from './services/SseService/sse-service.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logged: boolean

  constructor(private sseService: SseServiceService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute, private router: Router) {
    this.logged = false

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
      iconRegistry.addSvgIcon(
        'error-icon',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/errorIcon.svg'));
  }

  ngOnInit() {
    console.log("Contacting events...")
    this.sseService
      .getServerSentEvent("http://icosaf.cloud.reply.eu:4200/api")
      .subscribe(data => console.log(data));
    console.log(this.activatedRoute.url)
  }

  changeLogged() {
    this.logged = !this.logged
  }

  isLogged(): boolean {
    return this.logged
  }

  onSelect(iconSelected) {
    console.log(iconSelected)
  }


  navigateTo(url: string) {
    this.router.navigate([url])

  }
}