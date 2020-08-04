import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SseServiceService {

  constructor(private ngZone: NgZone) { }

  /**
   * Creates event source
   * @param url
   */
  getEventSource(url: string): EventSource {
    return new EventSource(url);
  }

  getServerSentEvent(url: string) {
    console.log("before")
    return Observable.create(observer => {
      console.log("middle")
      const eventSource = this.getEventSource(url);
      console.log("after")

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
