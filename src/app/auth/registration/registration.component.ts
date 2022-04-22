import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private authSrv: AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  user = {username:"", nome:"", cognome:"",password:"",email:"",role:[""]}

  async signup(form: NgForm) {

    this.user.username = form.value.username;
    this.user.nome = form.value.nome;
    this.user.cognome = form.value.cognome;
    this.user.password = form.value.password;
    this.user.email = form.value.email;
    this.user.role.splice(0,1);
    this.user.role.push(form.value.roles);

    console.log(this.user)


    try {
      await this.authSrv.register(this.user).toPromise();
      this.router.navigate(['/login'])
    } catch (error:any) {
      alert(error)
    }
  }

}
