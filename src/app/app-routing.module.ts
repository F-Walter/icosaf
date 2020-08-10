import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridListUCComponent } from './components/grid-list/grid-list-uc.component';
import { UseCaseDetailsComponent } from './components/UCDetails/use-case-details.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'UCChoice',
    pathMatch: 'full'
  },
 
  {
    path: 'UCChoice',
    // canActivate: [AuthGuard],
    component: GridListUCComponent,
  },

  {
    path: 'UseCaseDetails',
    component: UseCaseDetailsComponent,
  },
  // {
  //   path: 'logged',
  //   children: [
  //     // {
  //     //   path: 'applicationi-internet/students',
  //     //   component: StudentsContComponent
  //     // },
  //     // {
  //     //   path: 'applicationi-internet/vms',
  //     //   component: VmsContComponentComponent
  //     // }
  //   ]
  // },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
