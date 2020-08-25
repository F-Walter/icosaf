import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Boolean> {
  
    const cipher = CryptoJS.createCipher('aes128', 'a password');    
    var encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
   
   
    console.log("Criptato",encrypted);
    
    const URL: string = "";


    return this.http.post<Boolean>(URL, { login: username, pwd: password });
  }


  isLogged() {
    if (localStorage.getItem("session"))
      return true
    else
      return false
  }

}
