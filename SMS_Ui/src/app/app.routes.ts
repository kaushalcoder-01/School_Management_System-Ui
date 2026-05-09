import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  // {
  //   path: 'home',
  //   loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
    {
    path:'login', component:LoginComponent
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then( m => m.AdminPage)
  },
  {
    path: 'student',
    loadComponent: () => import('./student/student.page').then( m => m.StudentPage)
  },
  {
    path: 'teacher',
    loadComponent: () => import('./teacher/teacher.page').then( m => m.TeacherPage)
  },
  {
    path: 'parent',
    loadComponent: () => import('./parent/parent.page').then( m => m.ParentPage)
  },
];
