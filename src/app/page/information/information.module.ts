import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { ComponentsModule } from 'src/app/components/components.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { Inf001Component } from './inf001/inf001.component';
import { Inf001detailComponent } from './inf001detail/inf001detail.component';



const routes: Routes = [
  { path: 'inf001', component: Inf001Component },
  { path: 'inf001detail', component: Inf001detailComponent },
];

@NgModule({
  declarations: [
  Inf001Component,
  Inf001detailComponent
],
  imports: [
    CommonModule,    
    ComponentsModule,
    DataTablesModule,
    RouterModule.forChild(routes),
    BsDatepickerModule.forRoot()
  ],
  exports: [RouterModule],  
})
export class InformationModule { }
