import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StatisticsComponent } from '../cash-balance/statistics/statistics.component';
import { CashBalanceComponent } from '../cash-balance/cash-balance.component';
import { DetailsComponent } from '../cash-balance/details/details.component';

export const dashboardRoutes: Routes = [
    { path: '', component: StatisticsComponent },
    { path: 'cash-balance', component: CashBalanceComponent },
    { path: 'detail', component: DetailsComponent }
];