import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscherComponent } from './escher.component';
import { EscherStatisticsComponent } from './escher-statistics/escher-statistics.component';
import { EscherService } from './escher.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    EscherService
  ],
  declarations: [
    EscherComponent,
    EscherStatisticsComponent
  ],
  exports: [
    EscherComponent,
    EscherStatisticsComponent
  ],
})
export class EscherModule { }
