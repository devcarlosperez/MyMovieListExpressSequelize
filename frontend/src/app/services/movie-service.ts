import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    body.append("title", movie.title);
    body.append("rating", movie.rating);
    body.append("userId", localStorage.getItem('userId'))

    return this.httpClient.post(this.endpoint, body.toString(), { headers})
  }

  getAllMovies() {
    return this.httpClient.get(this.endpoint)
  }

  deleteMovies(movieId: number) {
    return this.httpClient.delete(`${this.endpoint}/${movieId}`)
  }
}
