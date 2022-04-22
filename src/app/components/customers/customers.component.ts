import { Component, OnInit } from '@angular/core';

import { ComponentsService } from '../components.service';
import { Cliente } from 'src/app/models/cliente';
import { CustomerData } from '../components.service';
import { PageEvent } from '@angular/material/paginator';
import { tap,map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  dataSource: CustomerData | any = null;
  pageEvent!: PageEvent;

  displayedColumns: string[] = ['id', 'partitaIva', 'pec', 'telefono', 'nomeEcognome', 'telefonoContatto', 'ragioneSociale', 'gestioneCliente' ];

  constructor(private componentsSrv: ComponentsService, private router: Router) { }

  ngOnInit(): void {
    this.initdataSource();
  }

  initdataSource(){
    this.componentsSrv.getCustomers(0, 10).pipe(
      tap((customerData: CustomerData) => console.log(customerData)),
      map((customerData: CustomerData) => {this.dataSource = customerData})).subscribe();
  }

  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 0;

  this.componentsSrv.getCustomers(page, size).pipe(map((customerData: CustomerData) => {this.dataSource = customerData})).subscribe();
  }


  cancellaCliente(idCliente: number){
    this.componentsSrv.cancellaCliente(idCliente).subscribe(canc =>{
      location.reload();
      console.log("Hai cancellato il cliente con id", idCliente)
    })
  }

  salvaDati(aggiungi:any) {
    let idCliente = localStorage.getItem("idCustomer");
    let dataBase = idCliente ? JSON.parse(idCliente) : [];
    dataBase.push(aggiungi);
    localStorage.setItem("idCustomer", JSON.stringify(dataBase));
  }

}
