import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';



export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

const navLinks = [
  {
    label: 'DiPreTreatUCChoice',
    link: 'DiPreTreatUCChoice',
  }
];

@Component({
  selector: 'grid-list-uc',
  templateUrl: './grid-list-uc.component.html',
  styleUrls: ['./grid-list-uc.component.css'],
})
export class GridListUCComponent {
  tryBool: boolean = false


  navLinks: any[]

  constructor(private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {


    this.navLinks = navLinks

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

  buttons = [
    { text: 'UC-A', value: "A", color: 'primary' },
    { text: 'UC-B', value: "B", color: 'accent' },
    { text: 'UC-C', value: "C", color: 'warn' },
    { text: 'UC-D', value: "D", color: 'inactive' }
  ]


  onClickButton(useCase: string) {
    this.router.navigate(['UseCaseDetails'], { queryParams: { UC: useCase } })
  }

  onSelect(iconSelected) {
    console.log(iconSelected)
  }
}