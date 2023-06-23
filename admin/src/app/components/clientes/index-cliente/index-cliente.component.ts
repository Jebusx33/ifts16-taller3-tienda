import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;
@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent {
  public clientes: Array<any> = [];
  public filtro_apellidos = "";
  public filtro_correo = "";
  public page = 1;
  public pageSize = 10;
  public token;
  public load_data = true;

  constructor(
    private _clienteService: ClienteService,
    private _AdminService: AdminService
  ) {
    this.token = this._AdminService.getToken();
  }
  ngOnInit(): void {
    this.init_Data();
  }

  init_Data() {
    this._clienteService.listar_clientes_filtro_admin(null, null, this.token).subscribe(
      Response => {
        // console.log(Response)
        this.clientes = Response.data;
        this.load_data = false;
        /* setTimeout(() => {
           this.load_data = false;
         }, 1500);
         */
        //console.log(Response.data)
      }, error => {
        console.log(error);
      }
    );
  }

  //filtro  
  filtro(tipo: String) {
    // console.log(tipo);
    //console.log(this.filtro_apellidos);
    // console.log(this.filtro_correo)

    if (tipo == 'apellidos') {
      if (this.filtro_apellidos) {
        this.load_data = true;
        this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_apellidos, this.token).subscribe(
          Response => {
            // console.log(Response)
            this.clientes = Response.data;
            this.load_data = false;
            //console.log(Response.data)
          }, error => {
            console.log(error);
          }
        );
      } else {
        this.init_Data();
      }

    } else if (tipo == 'correo') {
      if (this.filtro_correo) {
        this.load_data = true;
        this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_correo, this.token).subscribe(
          Response => {
            // console.log(Response)
            this.clientes = Response.data;
            this.load_data = false;
            //console.log(Response.data)
          }, error => {
            console.log(error);
          }
        );
      } else {
        this.init_Data();
      }
    }
  }

  eliminar(id: any) {
    this._clienteService.eliminar_cliente_admin(id, this.token).subscribe(
      Response => {
        // console.log(Response);
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: 'green',
          class: 'text-success',
          position: 'topCenter',
          message: 'El cliente se elimino correctamente'
        });
        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.init_Data();
      },
      error => {
        console.log(error);
      }
    );

  }
}
