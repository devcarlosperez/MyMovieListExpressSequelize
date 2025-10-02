import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyMovieListPageRoutingModule } from './my-movie-list-routing.module';

import { MyMovieListPage } from './my-movie-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyMovieListPageRoutingModule
  ],
  declarations: [MyMovieListPage]
})
export class MyMovieListPageModule {}
