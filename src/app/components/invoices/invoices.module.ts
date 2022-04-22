import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesComponent } from './invoices.component';

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
  component: InvoicesComponent,
}];


@NgModule({
  declarations: [InvoicesComponent],
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
export class InvoicesModule { }
