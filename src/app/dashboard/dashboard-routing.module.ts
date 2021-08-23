import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateExpenseComponent } from './create-expense/create-expense.component';

import { DashboardComponent } from './dashboard.component';
import { ExpenseComponent } from './expense/expense.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'expense/:expenseId', component: ExpenseComponent },
  { path: 'create', component: CreateExpenseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
