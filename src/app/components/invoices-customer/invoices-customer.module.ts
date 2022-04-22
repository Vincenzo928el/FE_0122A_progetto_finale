import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesCustomerComponent } from './invoices-customer.component';

import { RouterModule, Routes } from '@angular/router';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';

import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
{ path: '',
  component: InvoicesCustomerComponent,
}];

@NgModule({
  declarations: [InvoicesCustomerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ]
})
export class InvoicesCustomerModule { }
