import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ExpenseComponent } from './expense/expense.component';
import { CreateExpenseComponent } from './create-expense/create-expense.component';



@NgModule({
  declarations: [DashboardComponent, ExpenseComponent, CreateExpenseComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class DashboardModule { }
