import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private router: Router,
    private modalController: ModalController
  ) {}

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