import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  path: string

  constructor(private router: Router, activatedRoute: ActivatedRoute,  iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.path = "";
    activatedRoute.url.subscribe(url => {
      let i = 0
      for (i = 0; i < url.length - 1; i++) {
        this.path += url[i] + " > "
      }

      this.path += url[i]
    })

    iconRegistry.addSvgIcon(
      'bell-icon-notified',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/bellIconNotified.svg'));

  }


ngOnInit(): void {
}

logout() {
  // this.authService.logout()
  this.router.navigate(['home'])
}
}
