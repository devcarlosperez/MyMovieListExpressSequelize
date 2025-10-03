import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from './services/user-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  isLoggedIn: boolean = false;

  loginEmail: string = '';
  loginPassword: string = '';
  registerName: string = '';
  registerEmail: string = '';
  registerPassword: string = '';

  constructor(
    private router: Router,
    private modalController: ModalController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('userId') !== null;
  }

  login() {
    const user = {
      email: this.loginEmail,
      password: this.loginPassword,
    };

    this.userService.getUser(user).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        this.isLoggedIn = true;
        localStorage.setItem('userId', response.id);
        this.dismissModal();
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('userId');
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  register() {
    const user = {
      userName: this.registerName,
      email: this.registerEmail,
      password: this.registerPassword,
    };

    this.userService.create(user).subscribe({
      next: (response: any) => {
        console.log('Registration successful', response);
        this.dismissModal();
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.error('Registration failed', error);
      },
    });
  }

  getHomePage() {
    this.router.navigate(['/home']);
  }

  getMyListPage() {
    this.router.navigate(['/my-movie-list']);
  }

  async dismissModal() {
    const modal = await this.modalController.getTop();
    if (modal) {
      modal.dismiss();
    }
  }
}
