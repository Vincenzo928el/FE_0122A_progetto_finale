import { UserData } from './../components.service';
import { Component, OnInit} from '@angular/core';
import { ComponentsService } from '../components.service';

import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit{

  dataSource: UserData | any = null;
  pageEvent!: PageEvent;
  user!: UserData | any;

  displayedColumns: string[] = ['id', 'username', 'nome', 'cognome', 'email', 'ruolo',];

  constructor(private componentsSrv: ComponentsService) {
  }

  ngOnInit(): void {
  this.initdataSource();

  }

  initdataSource(){
    this.componentsSrv.getUsers(0, 10).pipe(
      tap(users => console.log(users)),
      map((userData: UserData) => {this.dataSource = userData})).subscribe();
  }


  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 0;

  this.componentsSrv.getUsers(page, size).pipe(map((userData: UserData) => {this.dataSource = userData})).subscribe();
  }
}








