import { Routes } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'explore',
    component: ExploreComponent,
    title: 'Explore'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About'
  },
];
