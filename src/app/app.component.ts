import { Component, NgZone } from '@angular/core';
import { SseServiceService } from './services/SseService/sse-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'icosaf';
  //NgZone to alert Angular when an event occurs because it happens outside of the framework.
  constructor(private sseService: SseServiceService, private ngZone: NgZone) {
    this.getServerSentEvent("http://icosaf.replycloud.prv:8081/events")
  }

  getServerSentEvent(url: string) {
    return Observable.create(observer => {
      const eventSource = this.sseService.getEventSource(url);


      eventSource.onmessage = event => {
        //success
        console.log("SseService on success");
        this.ngZone.run(() => {
          observer.next(event);
        })

      }
      eventSource.onerror = error => {
        console.log("SseService on Error");
        this.ngZone.run(() => {
          observer.next(error);
        })
      }
    })


  }



}
