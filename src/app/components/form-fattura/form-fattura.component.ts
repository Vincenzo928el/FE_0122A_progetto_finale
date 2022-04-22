import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { ComponentsService } from '../components.service';

import { Comune } from 'src/app/models/comune';
import { Provincia } from 'src/app/models/provincia';
import { Cliente } from 'src/app/models/cliente';
import { Stato } from 'src/app/models/stato';
import { Fattura } from 'src/app/models/fattura';

@Component({
  selector: 'app-form-fattura',
  templateUrl: './form-fattura.component.html',
  styleUrls: ['./form-fattura.component.scss']
})
export class FormFatturaComponent implements OnInit {

  id!: number;
	idCliente!: number;
	form!: FormGroup;
	fattura!: Fattura;
	statoFatture!: Stato[];

  province!: Provincia[];
	comuni!: Comune[];
  tipiclienti!: any[];

	constructor(
		private fb: FormBuilder,
		private componentsSrv: ComponentsService,
		private router: Router,
		private route: ActivatedRoute,
	) { }

	cSalva(DatiForm: { value: { data: string; numero: number; anno: number; importo: number; stato: any; }; }) {
		console.log(DatiForm.value);
		if (!this.id) {
			this.id = 0;
			this.fattura = { id: 0, numero: 0, anno: 0, data: '', importo: 0, stato: { id: 0, nome: '' }, cliente: {} };
		}
		this.fattura.id = this.id;
		this.fattura.data = DatiForm.value.data;
		this.fattura.numero = DatiForm.value.numero;
		this.fattura.anno = DatiForm.value.anno;
		this.fattura.importo = DatiForm.value.importo;
		this.fattura.stato.id = DatiForm.value.stato;
		if (this.idCliente) { this.fattura.cliente.id = this.idCliente; }

		this.componentsSrv.Save(this.id, this.fattura).subscribe(res => {
			console.log(res);
			this.router.navigate(['/invoices']);
		});
	}

	ngOnInit(): void {
		console.log('ngOnInit');
		this.route.params.subscribe(params => {
			this.id = +params['id'];
			console.log(this.id);
			this.InizializzaForm();
			this.Carica();
      this.CaricaStatoFatture();
		});
	}

	InizializzaForm() {
		console.log('InizializzaForm');
		this.form = this.fb.group({
			data: new FormControl('', [Validators.required]),
			numero: new FormControl('', [Validators.required]),
			anno: new FormControl('', [Validators.required]),
			importo: new FormControl('', [Validators.required]),
			stato: new FormControl(''),
		});
	}

	Carica() {
		if (this.id !== 0) {
			this.componentsSrv.getFatturaById(this.id).subscribe(
				data => {
					console.log(data);
					this.fattura = data;
					this.fattura.data = this.fattura.data.substr(0, 10);
					this.form.patchValue({
						data: this.fattura.data,
						numero: this.fattura.numero,
						anno: this.fattura.anno,
						importo: this.fattura.importo,
            stato: this.fattura.stato.id,
					})
				}
			);
		}
	}
	CaricaStatoFatture() {
		this.componentsSrv.getStatiFatturaAll(0).subscribe(
			data => {
				this.statoFatture = data.content;
			}
		);
	}


}
