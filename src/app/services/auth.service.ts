import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const URL: string = "";


@Injectable({
  providedIn: 'root'
})
export class AuthService {




  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Boolean> {
    return this.http.post<Boolean>(URL, { email: email, passoword: password });
  }


  isLogged() {
    if (localStorage.getItem("session"))
      return true
    else
      return false
  }

}
