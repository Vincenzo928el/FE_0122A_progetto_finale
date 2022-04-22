import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { Cliente } from '../models/cliente';
import { Fattura } from '../models/fattura';

import { Observable } from 'rxjs';

//INTERFACCE PER CHIAMATE API

//INTERFACCIA API CHIAMATA PER METODO getUsers
export interface UserData {
    content: User[];
    pageable: {
        sort: {
            unsorted: boolean;
            empty: boolean;
            sorted: boolean;
        };
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
    };

    last: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
    numberOfElements: number;
    size: number;
    first: boolean;
    sort: {
        unsorted: boolean;
        empty: boolean;
        sorted: boolean;
    };
    empty: boolean;
}

//INTERFACCIA API CHIAMATA PER METODO getCustomers
export interface CustomerData {
    content: Cliente[];
    pageable: {
        sort: {
            unsorted: boolean;
            empty: boolean;
            sorted: boolean;
        };
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
    };

    last: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
    numberOfElements: number;
    size: number;
    first: boolean;
    sort: {
        unsorted: boolean;
        empty: boolean;
        sorted: boolean;
    };
    empty: boolean;
}

//INTERFACCIA API CHIAMATA PER METODO getInvoices
export interface InvoiceData {
    content: Fattura[];
    pageable: {
        sort: {
            unsorted: boolean;
            empty: boolean;
            sorted: boolean;
        };
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
    };

    last: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
    numberOfElements: number;
    size: number;
    first: boolean;
    sort: {
        unsorted: boolean;
        empty: boolean;
        sorted: boolean;
    };
    empty: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class ComponentsService {
    constructor(private http: HttpClient, private router: Router) {}

    //CHIAMATE USERS
    getUsers(page: number, size: number): Observable<UserData> {
        let params = new HttpParams();

        params = params.append('page', page.toString());
        params = params.append('size', size.toString());

        return this.http
            .get(`${environment.apiBaseUrl}/users`, { params })
            .pipe(
                map((userData: any) => userData),
                catchError((err) => throwError(err))
            );
    }

    //CHIAMATE CLIENTI
    getCustomers(page: number, size: number): Observable<CustomerData> {
        let params = new HttpParams();

        params = params.append('page', page.toString());
        params = params.append('size', size.toString());

        return this.http
            .get(`${environment.apiBaseUrl}/clienti`, { params })
            .pipe(
                map((customerData: any) => customerData),
                catchError((err) => throwError(err))
            );
    }

    getClienteById(id: number) {
        return this.http.get<any>(`${environment.apiBaseUrl}/clienti/${id}`);
    }

    cancellaCliente(id: number) {
        return this.http.delete(`${environment.apiBaseUrl}/clienti/${id}`);
    }

    newOrModifyCliente(id: number, item: any) {
        if (!id) {
            return this.http.post<any>(
                `${environment.apiBaseUrl}/clienti/`,
                item
            );
        } else {
            return this.http.put<any>(
                environment.apiBaseUrl + '/clienti/' + id,
                item
            );
        }
    }

    getTipoClientiAll() {
        return this.http.get<any>(
            `${environment.apiBaseUrl}/clienti/tipicliente`
        );
    }

    //chiamata per filtrare i clienti per fatturato - da sistemare
    getCustomersFiltFatturato(
        from: number,
        to: number,
        page: number,
        size: number
    ): Observable<InvoiceData> {
        let params = new HttpParams();

        params = params.append('from', from.toString());
        params = params.append('to', to.toString());
        params = params.append('page', page.toString());
        params = params.append('size', size.toString());

        return this.http
            .get(`${environment.apiBaseUrl}/fatture/importo`, { params })
            .pipe(
                map((invoiceData: any) => invoiceData),
                catchError((err) => throwError(err))
            );
    }

    //CHIAMATE FATTURE
    getInvoices(page: number, size: number): Observable<InvoiceData> {
        let params = new HttpParams();

        params = params.append('page', page.toString());
        params = params.append('size', size.toString());

        return this.http
            .get(`${environment.apiBaseUrl}/fatture`, { params })
            .pipe(
                map((invoicesData: any) => invoicesData),
                catchError((err) => throwError(err))
            );
    }

    cancellaFattura(id: number) {
        return this.http.delete(`${environment.apiBaseUrl}/fatture/${id}`);
    }

    getFatturaById(id: number) {
        return this.http.get<any>(`${environment.apiBaseUrl}/fatture/${id}`);
    }

    getInvoicesByCliente(
        id: number,
        page: number,
        size: number
    ): Observable<InvoiceData> {
        let params = new HttpParams();

        params = params.append('page', page.toString());
        params = params.append('size', size.toString());

        return this.http
            .get(`${environment.apiBaseUrl}/fatture/cliente/${id}`, { params })
            .pipe(
                map((invoicesData: any) => invoicesData),
                catchError((err) => throwError(err))
            );
    }

    getStatiFatturaAll(p: number) {
        return this.http.get<any>(
            `${environment.apiBaseUrl}/statifattura?page=${p}&size=20&sort=id,ASC`
        );
    }

    Save(id: number, item: any) {
        if (!id) {
            return this.http.post<any>(
                `${environment.apiBaseUrl}/fatture/`,
                item
            );
        } else {
            return this.http.put<any>(
                environment.apiBaseUrl + '/fatture/' + id,
                item
            );
        }
    }

    Save1(item: any) {
        return this.http.post<any>(`${environment.apiBaseUrl}/fatture/`, item);
    }

    //CHIAMATE COMUNI
    getComuni(p: number) {
        return this.http.get<any>(
            `${environment.apiBaseUrl}/comuni?page=${p}&size=20&sort=id,ASC`
        );
    }

    //CHIAMATE PROVINCE
    getProvince(p: number) {
        return this.http.get<any>(
            `${environment.apiBaseUrl}/province?page=${p}&size=20&sort=id,ASC`
        );
    }
}
