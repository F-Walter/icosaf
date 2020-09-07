import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
    this.navLinks = navLinks
  }

  buttons = [
    { text: 'UC-A', value: "A", color: 'primary' },
    { text: 'UC-B', value: "B", color: 'accent' },
    { text: 'UC-C', value: "C", color: 'warn' },
    { text: 'UC-D', value: "D", color: 'inactive' }
  ]


  onClickButton(useCase: string) {

    if (useCase == 'C')
      this.router.navigate(['Home'])
    else
      this.router.navigate(['use-case-details'], { queryParams: { UC: useCase } })
  }


}