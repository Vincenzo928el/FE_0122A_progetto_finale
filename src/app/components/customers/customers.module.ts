import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersComponent } from './customers.component';

import { RouterModule, Routes } from '@angular/router';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

const routes: Routes = [
  { path: '',
  component: CustomersComponent,}];

@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class CustomersModule { }
