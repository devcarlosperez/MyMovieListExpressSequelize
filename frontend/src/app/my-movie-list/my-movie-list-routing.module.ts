import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyMovieListPage } from './my-movie-list.page';

const routes: Routes = [
  {
    path: '',
    component: MyMovieListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMovieListPageRoutingModule {}
