import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyMovieListPage } from './my-movie-list.page';

describe('MyMovieListPage', () => {
  let component: MyMovieListPage;
  let fixture: ComponentFixture<MyMovieListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMovieListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
