import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoldiersComponent } from './components/soldiers/soldiers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SoldierDetailComponent } from './components/soldier-detail/soldier-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'soldiers', component: SoldiersComponent },
  { path: 'soldier/:id', component: SoldierDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
