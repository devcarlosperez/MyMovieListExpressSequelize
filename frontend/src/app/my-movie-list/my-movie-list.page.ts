import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie-service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-movie-list',
  templateUrl: './my-movie-list.page.html',
  styleUrls: ['./my-movie-list.page.scss'],
  standalone: false
})
export class MyMovieListPage implements OnInit {
  isLoggedIn: boolean = false;
  movies: any = [];
  addMovieTitle: string = '';
  addMovieRating: number = 0;

  constructor(private movieService: MovieService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('userId') !== null;
    if (this.isLoggedIn) {
      this.getAllMovies();
    }
  }

  getAllMovies() {
    this.movieService.getAllMovies().subscribe({
      next: (response: any) => {
        this.movies = response;
        console.log('Movies loaded:', this.movies);
      },
      error: (error) => {
        console.error('Error loading movies:', error);
      }
    });
  }

  addMovie() {
    if (this.addMovieTitle && this.addMovieRating) {
      const movie = {
        name: this.addMovieTitle,
        rating: this.addMovieRating
      };

      this.movieService.create(movie).subscribe({
        next: (response: any) => {
          console.log('Movie added successfully:', response);
          this.dismissModal();
          this.getAllMovies();
        },
        error: (error) => {
          console.error('Error adding movie:', error);
        }
      });
    }
  }

  async dismissModal() {
      const modal = await this.modalController.getTop();
      if (modal) {
        modal.dismiss();
      }
  }

}
