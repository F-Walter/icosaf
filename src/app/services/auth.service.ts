import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
    console.log("AAAAAAAAAA",CryptoJS.AES.encrypt("icosaf123", "a password").toString())

  }



  login(username: string, password: string): Observable<Boolean> {

    const URL: string = "";



    // return this.http.post<Boolean>(URL, { login: username, pwd: password });
    return new Observable()
  }


  isLogged() {
    if (localStorage.getItem("session"))
      return true
    else
      return false
  }

}
