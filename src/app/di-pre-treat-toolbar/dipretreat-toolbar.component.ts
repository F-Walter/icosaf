import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dipretreat-toolbar',
  templateUrl: './dipretreat-toolbar.component.html',
  styleUrls: ['./dipretreat-toolbar.component.css']
})
export class DipretreatToolbarComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }


  logout() {
    // this.authService.logout()
    this.router.navigate(['home'])
  }

}
