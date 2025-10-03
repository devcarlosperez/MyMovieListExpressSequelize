import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  endpoint = 'http://localhost:8080/api/movies';

  constructor(private httpClient: HttpClient) {}

  create(movie: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.append("name", movie.name);
    body.append("rating", movie.rating);
    body.append("userId", localStorage.getItem('userId') || '')

    return this.httpClient.post(this.endpoint, body.toString(), { headers})
  }

  getAllMovies() {
    const userId = localStorage.getItem('userId')
    return this.httpClient.get(`${this.endpoint}?userId=${userId}`)
  }

  deleteMovies(movieId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.append('userId', localStorage.getItem('userId') || '')

    return this.httpClient.delete(`${this.endpoint}/${movieId}`, {headers, body: body.toString()});
  }

  updateMovie(movieId: number, movie: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.append('name', movie.name);
    body.append('rating', movie.rating);
    body.append('userId', localStorage.getItem('userId') || '');

    return this.httpClient.put(`${this.endpoint}/${movieId}`, body.toString(), { headers });
  }

  searchMovies(title: string): Observable<any> {
    return this.httpClient.get(`http://www.omdbapi.com/?apikey=ce2589c3&s=${encodeURIComponent(title)}`);
  }
}