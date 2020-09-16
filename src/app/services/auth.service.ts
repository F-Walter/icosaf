import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
 
  }



  login(usernameA: string, passwordA: string): Observable<Boolean> {

    const password = 'icosaf123';
    const username = "mrossi"

    var pwd = 'icosaf123';
    
    var encrypted = CryptoJS.AES.encrypt(pwd, "my-secret");
    
    console.log(encrypted.toString());

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
