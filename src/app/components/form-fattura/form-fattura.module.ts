import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFatturaComponent } from './form-fattura.component';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: FormFatturaComponent }];

@NgModule({
  declarations: [FormFatturaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FormFatturaModule { }
