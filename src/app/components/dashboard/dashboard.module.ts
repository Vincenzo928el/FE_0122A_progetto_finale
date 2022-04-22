import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';

import { RouterModule, Routes } from '@angular/router';

import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import {MatProgressBarModule} from '@angular/material/progress-bar';

import {MatFormFieldModule} from '@angular/material/form-field'; //importa il modulo per i campi di form in angular material
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'customers',
        loadChildren: () =>
        import('../customers/customers.module').then((m) => m.CustomersModule),
      },
      {
        path: 'form-cliente/:id',
        loadChildren: () =>
          import('../form-cliente/form-cliente.module').then((m) => m.FormClienteModule),
      },
      {
        path: 'invoices',
        loadChildren: () =>
          import('../invoices/invoices.module').then((m) => m.InvoicesModule),
      },
      {
        path: 'form-fattura/:id',
        loadChildren: () =>
          import('../form-fattura/form-fattura.module').then((m) => m.FormFatturaModule),
      },
      {
        path: 'invoices/cliente/:id',
        loadChildren: () =>
          import('../invoices-customer/invoices-customer.module').then((m) => m.InvoicesCustomerModule),
      },
      {
        path: 'nuova-fattura/:id',
        loadChildren: () =>
          import('../nuova-fattura/nuova-fattura.module').then((m) => m.NuovaFatturaModule),
      },
    ],
  },
];

@NgModule({
  declarations: [DashboardComponent, NavbarComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    MatRadioModule

  ],
  exports: [RouterModule]
})
export class DashboardModule { }
