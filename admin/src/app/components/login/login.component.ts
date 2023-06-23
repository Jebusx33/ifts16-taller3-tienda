import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user: any = {};
  public usuario: any = {};
  public token: any = "";

  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    console.log(this.token)
    if (this.token) {
      this._router.navigate(['/']);
    } else {
      //Se mantiene en el componente
    }
  }

  login(loginForm: { valid: any; }) {
    if (loginForm.valid) {
      //console.log(this.user)
      //alert('Es Valido');
      let data = {
        email: this.user.email,
        password: this.user.password
      }
      this._adminService.login_admin(data).subscribe(
        Response => {
          console.log(Response);
          if (Response.data == undefined) {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: 'red',
              class: 'text-danger',
              position: 'topCenter',
              message: Response.message
            });
          } else {
            this.usuario = Response.message;

            localStorage.setItem('token', Response.token); //guarda el token
            localStorage.setItem('_id', Response.data._id);//guarda el id
            this._router.navigate(['/']);
          }

        }, error => {
          console.log(error);
        }
      );
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: 'red',
        class: 'text-danger',
        position: 'topCenter',
        message: 'Los datos ingresados no son validos'
      });
    }

  }
}


