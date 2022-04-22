import { Component, OnInit } from '@angular/core';

import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ComponentsService } from '../components.service';

import { Comune } from 'src/app/models/comune';
import { Provincia } from 'src/app/models/provincia';
import { Fattura } from 'src/app/models/fattura';

@Component({
    selector: 'app-nuova-fattura',
    templateUrl: './nuova-fattura.component.html',
    styleUrls: ['./nuova-fattura.component.scss'],
})
export class NuovaFatturaComponent implements OnInit {
    id!: number;
    idCliente!: number;
    form!: FormGroup;
    fattura!: Fattura;
    statoFatture!: any;

    province!: Provincia[];
    comuni!: Comune[];
    tipiclienti!: any[];

    constructor(
        private fb: FormBuilder,
        private componentsSrv: ComponentsService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.componentsSrv.getStatiFatturaAll(0).subscribe((data) => {
            this.statoFatture = data.content;
        });

        console.log('ngOnInit');

        this.route.params.subscribe((params) => {
            this.idCliente = +params['id'];
            this.InizializzaForm();
        });
    }

    cSalva(DatiForm: {
        value: {
            data: string;
            numero: number;
            anno: number;
            importo: number;
            stato: any;
        };
    }) {
        console.log(DatiForm.value);

        this.id = 0;
        this.fattura = {
            id: 0,
            numero: 0,
            anno: 0,
            data: '',
            importo: 0,
            stato: { id: 0, nome: '' },
            cliente: {},
        };
        this.fattura.id = this.id;
        this.fattura.data = DatiForm.value.data;
        this.fattura.numero = DatiForm.value.numero;
        this.fattura.anno = DatiForm.value.anno;
        this.fattura.importo = DatiForm.value.importo;

        this.fattura.stato.id = DatiForm.value.stato;

        this.fattura.cliente.id = this.idCliente;

        console.log(this.fattura);

        this.componentsSrv.Save(this.id, this.fattura).subscribe((res) => {
            console.log(res);
            this.router.navigate(['/invoices']);
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
}
