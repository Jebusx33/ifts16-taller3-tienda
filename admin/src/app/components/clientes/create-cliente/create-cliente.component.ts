import { Component } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';


declare var iziToast: any;
@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent {
  public cliente: any = {
    tipoDni: '',
    genero: ''
  };
  public token;
  public load_btn = false;
  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
  }

  registro(registroForm: any) {
    if (registroForm.valid) {
      //  console.log(this.cliente)
      //se envian los datos a la api
      this.load_btn = true;
      this._clienteService.registro_cliente_admin(this.cliente, this.token).subscribe(
        Response => {
          // console.log(Response);
          //mensaje de exito
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: 'green',
            class: 'text-success',
            position: 'topCenter',
            message: 'El cliente se registro correctamente'
          });
          //limpia
          this.cliente = {
            nombres: '',
            apellidos: '',
            pais: '',
            email: '',
            password: '',
            perfil: '',
            telefono: '',
            f_nacimiento: '',
            tipoDni: '',
            dni: '',
            genero: ''
          }
          this.load_btn = false;
          this._router.navigate(['/panel/clientes'])

        }, error => {
          console.log(error)
        }
      );
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: 'red',
        class: 'text-danger',
        position: 'topCenter',
        message: 'Los datos ingresados no son validos o faltan datos a completar'
      });
    }
  }

}
