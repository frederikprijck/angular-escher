import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRouterModule } from './dashboard.routes';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { SelectedNodesComponent } from './selected-nodes/selected-nodes.component';
import { SelectedNodePipe } from './selected-nodes/selected-node.pipe';
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
    FileUploadComponent,
    ThemeSelectorComponent,
    SelectedNodesComponent,
    SelectedNodePipe,
    DashboardComponent
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
