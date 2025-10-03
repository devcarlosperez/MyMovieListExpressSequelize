import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../services/movie-service';
import { ModalController, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-my-movie-list',
  templateUrl: './my-movie-list.page.html',
  styleUrls: ['./my-movie-list.page.scss'],
  standalone: false,
})
export class MyMovieListPage implements OnInit {
  isLoggedIn: boolean = false;
  movies: any = [];
  suggestions: any = [];
  addMovieTitle: string = '';
  addMovieRating: number = 0;
  httpClient: any;
  isUpdateModalOpen: boolean = false;
  updateMovieId: number | null = null;
  updateMovieTitle: string = '';
  updateMovieRating: number = 0;

  constructor(
    private movieService: MovieService,
    private modalController: ModalController
  ) {}

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
      },
    });
  }

  addMovie() {
    if (this.addMovieTitle && this.addMovieRating) {
      const movie = {
        name: this.addMovieTitle,
        rating: this.addMovieRating,
      };

      this.movieService.create(movie).subscribe({
        next: (response: any) => {
          console.log('Movie added successfully:', response);
          this.addMovieTitle = '';
          this.addMovieRating = 0;
          this.dismissModal();
          this.getAllMovies();
        },
        error: (error) => {
          console.error('Error adding movie:', error);
        },
      });
    }
  }

  deleteMovie(movieId: number) {
    this.movieService.deleteMovies(movieId).subscribe({
      next: (response: any) => {
        console.log('Movie deleted successfully:', response);
        this.getAllMovies();
      },
      error: (error) => {
        console.error('Error deleting movie:', error);
      },
    });
  }

  async dismissModal() {
    const modal = await this.modalController.getTop();
    if (modal) {
      modal.dismiss();
    }
  }

  onTitleChange(event: any) {
    const value = event.target.value;

    if (value && value.length > 2) {
      this.movieService.searchMovies(value).subscribe({
        next: (response: any) => {
          if (response.Response === 'True') {
            this.suggestions = response.Search;
          } else {
            this.suggestions = [];
          }
        },
        error: (err: any) => {
          console.error('Error fetching suggestions', err);
          this.suggestions = [];
        },
      });
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(movie: any) {
    this.addMovieTitle = movie.Title;
    this.suggestions = [];
  }

  openUpdateModal(movie: any) {
    this.updateMovieId = movie.id;
    this.updateMovieTitle = movie.name;
    this.updateMovieRating = movie.rating;
    this.isUpdateModalOpen = true;
  }

  closeUpdateModal() {
    this.isUpdateModalOpen = false;
    this.updateMovieId = null;
    this.updateMovieTitle = '';
    this.updateMovieRating = 0;
  }

  saveUpdate() {
    if (this.updateMovieId && this.updateMovieTitle && this.updateMovieRating) {
      const updatedMovie = {
        name: this.updateMovieTitle,
        rating: this.updateMovieRating,
      };
      this.movieService.updateMovie(this.updateMovieId, updatedMovie).subscribe({
        next: () => {
          this.getAllMovies();
          this.closeUpdateModal();
        },
        error: (error) => {
          console.error('Error updating movie:', error);
        },
      });
    }
  }
}