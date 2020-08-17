import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridListUCComponent } from './components/grid-list/grid-list-uc.component';
import { UseCaseDetailsComponent } from './components/UCDetails/use-case-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginDialogComponent } from './components/login/login-dialog/login-dialog.component';
import { AgvDetailsComponent } from './components/agv-details/agv-details.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    // canActivate: [AuthGuard],
    component: GridListUCComponent,
  },

  {
    path: 'use-case-details',
    component: UseCaseDetailsComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'agv-details/:id',
        component: AgvDetailsComponent,
        outlet: "dashboardContent"
      }
    ]
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
