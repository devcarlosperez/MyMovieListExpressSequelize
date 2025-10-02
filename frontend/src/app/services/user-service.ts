import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoint = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) {}

  create(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.append('username', user.username);
    body.append('email', user.email);
    body.append('password', user.password);

    return this.httpClient.post(this.endpoint, body.toString(), { headers });
  }

  getUser(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.append('email', user.email);
    body.append('password', user.password);

    return this.httpClient.post(`${this.endpoint}/login`, body.toString(), {
      headers,
    });
  }
}
