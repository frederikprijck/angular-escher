import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRouterModule } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { EscherModule } from './../escher/escher.module';

@NgModule({
  imports: [
    CommonModule,
    EscherModule,
    DashboardRouterModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
