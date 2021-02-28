import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'problems',
    pathMatch: 'full', //exactly match
  },
  {
    path: 'problems',
    component: ProblemListComponent,
  },
  {
    path: 'problems/:id',
    component: ProblemDetailComponent,
  },
  {
    path: '**', //any other routes redirect to 'problem'
    redirectTo: 'problems',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
