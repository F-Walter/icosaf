import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {

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

  ngOnInit(): void {
  }

  onSelect(iconSelected) {
    console.log(iconSelected)
  }

}
