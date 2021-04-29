import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from 'src/404.component';
import { CoursesComponent } from './courses/courses.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestedCoursesComponent } from './requested-courses/requested-courses.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-courses',
    pathMatch: 'full',
  },
  {
    path: 'all-courses',
    component: CoursesComponent,
  },
  {
    path: 'requested-courses/:id',
    component: RequestedCoursesComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
