import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';


declare var iziToast:any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public load_data = true;
  public filtro = '';
  public token;
  public productos : Array<any> =[];
  public arr_productos : Array<any> = [];
  public url;
  public page = 1;
  public pageSize = 3;

  public load_btn =false;

  constructor(
    private _productoService : ProductoService,
    private _AdminService: AdminService
      //{this.token = localStorage.getItem('token')}
  ){
  this.token = this._AdminService.getToken();
  this.url = GLOBAL.url;
  }


  ngOnInit(): void {
    this.init_Data();
  }

  init_Data() {
      this._productoService.listar_productos_admin(this.filtro,this.token).subscribe(
        Response=>{
          console.log(Response);
          this.productos = Response.data;
          this.load_data = false;
      /*    this.productos.forEach(element => {
              this.arr_productos.push({
                titulo: element.titulo,
                stock: element.stock,
                precio: element.precio,
                categoria: element.categoria,
                nventas: element.nventas
              });
          }); */
          //console.log(this.arr_productos);
      },
  error=>{
    console.log(error);
  }
  
  )

}

filtrar(){
  if(this.filtro){
    this._productoService.listar_productos_admin(this.filtro,this.token).subscribe(
      Response=>{
        console.log(Response);
        this.productos = Response.data;
        this.load_data = false;
    /*    this.productos.forEach(element => {
            this.arr_productos.push({
              titulo: element.titulo,
              stock: element.stock,
              precio: element.precio,
              categoria: element.categoria,
              nventas: element.nventas
            });
        }); */
        //console.log(this.arr_productos);
    },
error=>{
  console.log(error);
}

)
  }else{
    iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese un filtro para buscar'
    });
  }
}


resetar(){
  this.filtro = '';
  this.init_Data();
}

eliminar(id:any){
  this.load_btn = true;
  this._productoService.eliminar_producto_admin(id,this.token).subscribe(
    response=>{
      iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Se eliminó correctamente el producto.'
      });

      $('#delete-'+id).modal('hide');
      $('.modal-backdrop').removeClass('show');

      this.load_btn = false;

      this.init_Data();

      
    },
    error=>{
      iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Ocurrió un error en el servidor.'
      });
      console.log(error);
      this.load_btn = false;
    }
  )
}

}