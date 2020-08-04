import { Component, NgZone, OnInit } from '@angular/core';
import { SseServiceService } from './services/SseService/sse-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'icosaf';
  //NgZone to alert Angular when an event occurs because it happens outside of the framework.
  constructor(private sseService: SseServiceService, private ngZone: NgZone) {
  }

  ngOnInit(){
    console.log("Contacting events...")
    this.sseService
      .getServerSentEvent("http://icosaf.cloud.reply.eu:4200/api")
      .subscribe(data => console.log(data));
  }
}