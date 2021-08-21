import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }, { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
{path: '',redirectTo:'user/login', pathMatch:'full'},
{ path: '*', redirectTo: 'user/login' },
{ path: '**', redirectTo: 'user/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
