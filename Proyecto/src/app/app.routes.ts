import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,  // This will render HomeComponent at the root path
    pathMatch: 'full'  // Ensures this is the default route when the path is exactly '/'
  },
  {
    path: 'home',
    component: HomeComponent  // Optionally, another route for '/home'
  }
];
