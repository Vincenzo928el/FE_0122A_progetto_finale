import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user$ = this.authSrv.user$

  isExpanded:boolean = false;

  fixedInViewPort:boolean = true;

  constructor(private authSrv: AuthService, private breakpointObserver: BreakpointObserver) {

   }

  ngOnInit(): void {
  }

  logout(){
    this.authSrv.logout();
  }
}
