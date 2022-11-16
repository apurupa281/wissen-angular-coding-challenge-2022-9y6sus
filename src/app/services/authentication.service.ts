import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';

const baseApiURL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    var payload = {
      username,
      password,
    };
    return this.http.post(`${baseApiURL}login`, payload);
  }

  getUserDetails() {
    let token = localStorage.getItem('userToken');
    const headerDict = {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(`${baseApiURL}unknown`, requestOptions);
  }
}
