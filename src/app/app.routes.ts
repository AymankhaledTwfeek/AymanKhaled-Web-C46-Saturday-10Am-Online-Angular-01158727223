import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'عدسة - الصفحة الرئيسية'
  },
  { 
    path: 'blog', 
    component: BlogComponent,
    title: 'عدسة - المدونة'
  },
  { 
    path: '**', 
    component: NotFoundComponent,
    title: 'عدسة - الصفحة غير موجودة'
  }
];
