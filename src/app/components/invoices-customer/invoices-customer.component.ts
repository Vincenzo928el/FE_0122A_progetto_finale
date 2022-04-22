import { Component, OnInit } from '@angular/core';

import {ComponentsService} from '../components.service';
import { Fattura } from 'src/app/models/fattura';

import { InvoiceData } from '../components.service';
import { PageEvent } from '@angular/material/paginator';
import { tap,map } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-invoices-customer',
  templateUrl: './invoices-customer.component.html',
  styleUrls: ['./invoices-customer.component.scss']
})
export class InvoicesCustomerComponent implements OnInit {

  dataSource: InvoiceData | any = null;
  pageEvent!: PageEvent;

  displayedColumns: string[] = ['id', 'fatturaNumero', 'data', 'importo', 'ragioneSociale', 'telefonoContatto', 'stato', 'gestioneFattura' ];

  idCliente!: number;

  labelRagioneSociale!: string;


  min!:number;
  max!:number;

  filtrato:boolean = false;

  page:any;
  size:any;

  constructor(private componentsSrv: ComponentsService, private router: Router, private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
			this.idCliente = +params['id'];
			console.log(this.idCliente);
    });

    this.initdataSource();
  }

  initdataSource(){
    this.componentsSrv.getInvoicesByCliente(this.idCliente, 0, 10).pipe(
      map((invoiceData: InvoiceData) => {
        this.filtrato = false;
        this.dataSource = invoiceData
        var cliente = this.dataSource.content[0].cliente;
        this.labelRagioneSociale = cliente.ragioneSociale})
    ).subscribe();

  }

  onPaginateChange(event: PageEvent){
    this.page = event.pageIndex;
    this.size = event.pageSize;

    this.page = this.page + 0;

    if(!this.filtrato && this.idCliente){
    this.componentsSrv.getInvoicesByCliente(this.idCliente, this.page, this.size).pipe(
      map((invoiceData: InvoiceData) => {this.dataSource = invoiceData
    })).subscribe();
    this.initdataSource();

    }else{this.componentsSrv.getCustomersFiltFatturato(this.min, this.max,this.page,this.size).pipe(
      map((invoiceData: InvoiceData) => {this.dataSource = invoiceData}))
    .subscribe();

    this.componentsSrv.getCustomersFiltFatturato(this.min, this.max,0,20).pipe(
      map((invoiceData: InvoiceData) => {this.dataSource = invoiceData}))
    .subscribe();}
  }

  cancellaFattura(idFattura:number){
    this.componentsSrv.cancellaFattura(idFattura).subscribe(canc =>{
      location.reload();
      alert("Hai cancellato la fattura con id" + idFattura)
    })
  }
}
