import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

declare var iziToast: any;
@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {
  public cliente: any = {};
  public id: any;
  public token;
  public load_btn = false;
  public load_data = true;
  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
  }
  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        // console.log("ruta;" + this.id);
        this.load_btn = true;
        this._clienteService.obtener_cliente_admin(this.id, this.token).subscribe(
          response => {

            //valida si el id de la ruta enviada del back es correcta y envia los datos al formulario
            if (response.data == undefined) {
              this.cliente = undefined;
              this.load_data = false;
            } else {
              this.cliente = response.data;
             // console.log(this.cliente);
              this.load_data = false;
            }


          },
          error => {
            console.log("error")
          });
      });
  }


  actualizar(updateForm: any) {

    if (updateForm.valid) {
      //  console.log(this.cliente)
      //se envian los datos a la api
      this._clienteService.actualizar_cliente_admin(this.id, this.cliente, this.token).subscribe(
        Response => {
          //console.log(Response);
          //mensaje de exito
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#AED6F1',
            color: 'blue',
            class: 'text-success',
            position: 'topCenter',
            message: 'El cliente se registro correctamente'
          });
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
