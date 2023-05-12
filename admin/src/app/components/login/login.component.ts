import { Component } from '@angular/core';
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
  public user: any = {}
  constructor(
    private _adminService:AdminService
  ) {

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
        Response =>{
          console.log(Response );
        },error=>{
          console.log(error );
        }
      );
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor:'#FF0000',
        color:'red',
        class: 'text-danger',
        position: 'topCenter',
        message:'Los datos ingresados no son validos'
      });
    }

  }
}


